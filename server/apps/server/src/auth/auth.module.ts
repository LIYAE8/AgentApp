import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SharedModule } from '@lib/shared';
@Module({
    imports:[SharedModule], //jwtService
    providers:[AuthService],
    exports:[AuthService],
})
export class AuthModule {}
