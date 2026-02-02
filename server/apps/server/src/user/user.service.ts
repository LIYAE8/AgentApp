import { Injectable } from '@nestjs/common';
import { PrismaService } from '@lib/shared';
import { Prisma } from '@lib/shared/generated/prisma/client';
import type { UserRegister, UserLogin } from '@en/common/user/index.ts'
import { ResponseService } from '@lib/shared/response/response.service';
const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  address: true,
  password: false,
  avatar: true,
  wordNumber: true,
  dayNumber: true
}
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService, private readonly response: ResponseService) {

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
    const result = this.prisma.user.update({
      where: {
        phone: loginform.phone
      },
      select: userSelect,
      data: {
        lastLoginAt: new Date()
      }
    })

    return this.response.success(result, '登录成功')
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
      return this.response.error('手机号已经存在');
    }
    //判断邮箱
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
    const result = await this.prisma.user.create({
      data,
      select: userSelect
    })

    return this.response.success(result, '注册成功')
  }

  async findAll(): Promise<any> {
    // console.log(this.prisma)
    const test = await this.prisma.user.findMany()
    return this.response.success(test)
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
