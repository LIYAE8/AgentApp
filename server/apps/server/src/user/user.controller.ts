import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import type { UserRegister, UserLogin ,Token,TokenPayload} from '@en/common/user/index.ts'

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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
