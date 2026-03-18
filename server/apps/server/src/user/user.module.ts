import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';  // 导入AuthModule
@Module({
  imports: [
    AuthModule,  // 确保导入包含AuthService的模块
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
