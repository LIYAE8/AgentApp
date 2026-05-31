import { Controller, Get, Post, Body, Patch, Param, Delete,UploadedFile,UseInterceptors,UseGuards,Req } from '@nestjs/common';
import { UserService } from './user.service';
import type { UserRegister, UserLogin ,Token,TokenPayload,UserUpdate} from '@en/common/user/index.ts'
import { FileInterceptor,  } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  login(@Body() loginform) {
    return this.userService.login(loginform);
  }

  @Post('register')
  register(@Body() registerform) {
    return this.userService.register(registerform);
  }

  //刷新token
  @Post('refresh-token')
  refreshToken(@Body() createUserDto: Omit<Token, 'accessToken'>) {
    return this.userService.refreshToken(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //上传头像
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file')) //限制前端的key必须是file
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadAvatar(file);
  }

  @Post('update-user')
  updateUser(@Body() updateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }
}
