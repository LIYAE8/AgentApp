import { Injectable,ConflictException  } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
import { Prisma } from '@lib/shared/generated/prisma/client';
import type { UserRegister, UserLogin ,Token,TokenPayload,UserUpdate} from '@en/common/user/index.ts'
import { AuthService } from '../auth/auth.service';
import { ResponseService } from '@lib/shared/response/response.service';
import { JwtService } from '@nestjs/jwt';
import { MinioService } from '@lib/shared/minio/minio.service';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
//过滤密码
const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  address: true,
  password: false,
  avatar: true,
  wordNumber: true,
  dayNumber: true,
  bio:true,
  isTimingTask:true,
  timingTaskTime:true
}

const updateUserSelect = {
  name: true,
  email: true,
  address: true,
  avatar: true,
  bio:true,
  isTimingTask:true,
  timingTaskTime:true
}
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly response: ResponseService,private readonly authService: AuthService,private readonly jwtService: JwtService,private readonly minioService: MinioService,private readonly configService: ConfigService) {

  }
  create(createUserDto) {
    return 'This action adds a new user';
  }

  async login(loginform: UserLogin) {
    //1. 检查是手机号是否存在
    const user = await this.prisma.user.findUnique({
      where: {
        phone: loginform.phone
      }
    })
    if (!user) {
      this.response.error('手机号未注册！')
    }
    //2. 检查密码是否正确
    if (user?.password !== loginform.password) {
      this.response.error('密码错误！')
    }
    //3. 查询用户信息 更新最后登录时间
    // const result = await this.prisma.user.update({
    //   where: {
    //     phone: loginform.phone
    //   },
    //   select: userSelect,
    //   data: {
    //     lastLoginAt: new Date()
    //   }
    // })
    //3. 查询用户信息 更新最后登录时间
    const updateUser = await this.prisma.user.update({
      where: {
        id: user?.id, //查询用户ID
      },
      data: {
        lastLoginAt: new Date(), //最后登录时间
      },
      select: userSelect
    })
    //4. 生成token
    const token = this.authService.generateToken({ userId: updateUser.id, name: updateUser.name, email: updateUser.email });
    return this.response.success({...updateUser,token});
    // return this.response.success(result, '登录成功')
  }

  async register(registerform: UserRegister) {
    const data: Prisma.UserCreateInput = {
      name: registerform.name,
      email: registerform.email,
      phone: registerform.phone,
      password: registerform.password,
    }

    //判断手机号是否存在
    const user = await this.prisma.user.findUnique({
      where: {
        phone: registerform.phone
      }
    })
    if (user) {
      throw new ConflictException('手机号已经存在');
      // return this.response.error('手机号已经存在');
    }
    //判断邮箱是否存在
    if (registerform.email) {
      const userEmail = await this.prisma.user.findUnique({
        where: {
          email: registerform.email
        }
      })
      if (userEmail) {
        return this.response.error('邮箱号已经存在');
      }
    }
    //新增
    const newUser = await this.prisma.user.create({
      data,
      select: userSelect
    })

    //4. 生成token
    const token = this.authService.generateToken({ userId: newUser.id, name: newUser.name, email: newUser.email });
    return this.response.success({...newUser,token});
    // return this.response.success(result, '注册成功')
    
  }
  //刷新token
  async refreshToken(createUserDto: Omit<Token, 'accessToken'>) {
    try {
    //1. 验证refreshToken是否有效
    const decoded = this.jwtService.verify<TokenPayload>(createUserDto.refreshToken);
    //2. 查询用户信息分辨是否伪造payload
    const user = await this.prisma.user.findUnique({
      where: {
        id: decoded.userId, //查询用户ID
      }
    })
    if (!user) {
      return this.response.error('用户不存在');
    }
    //3. 生成新的token
    const token = this.authService.generateToken({ userId: user.id, name: user.name, email: user.email });
    //4. 返回新的token
    return this.response.success(token);
    } catch (error) {
      return this.response.error('refreshToken已过期或无效');
    }
  }

  async findAll(): Promise<any> {
    // console.log(this.prisma)
    const test = await this.prisma.user.findMany()
    return this.response.success(test)
  }
  //上传头像
  async uploadAvatar(file: Express.Multer.File) {
    if(!file) {
      return this.response.error(null, '文件不存在');
    }
    if(file.size > 1024 * 1024 * 5) {
      return this.response.error(null, '文件大小不能超过5MB');
    }
    //获取minio客户端
    const client = this.minioService.getClient();
    //获取bucket桶名
    const bucket = this.minioService.getBucket();
    //资源的名称
    const fileName = `${Date.now()}-${file.originalname}`;
    //上传资源到minio
    await client.putObject(bucket,fileName,file.buffer,file.size,{
      "Content-Type": file.mimetype
    })
    //返回文件url
    const isHttps = !!Number(this.configService.get('MINIO_USE_SSL')) //是否启用SSL
    const baseUrl = isHttps ? 'https' : 'http' //前缀http
    const port = this.configService.get<string>('MINIO_PORT')! //端口9000
    const databaseUrl = `/${bucket}/${fileName}`//数据库url /avatar/1234567890-xiaomansdas.jpg
    const previewUrl = `${baseUrl}://${this.configService.get('MINIO_ENDPOINT')}:${port}${databaseUrl}`
    //previewUrl->http://192.168.2.100:9000/avatar/1234567890-xiaomansdas.jpg
    //databaseUrl->/avatar/1234567890-xiaomansdas.jpg
    return this.response.success({
      previewUrl,
      databaseUrl,
    });
  }

  //更新用户信息
  async updateUser(updateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: updateUserDto.id
      }
    })
    if (!user) {
      return this.response.error('用户不存在');
    }
    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: updateUserDto,
      select: updateUserSelect
    })
    return this.response.success(updatedUser);
  }
}
