import { Injectable,OnModuleInit } from '@nestjs/common';
import { AlipaySdk } from 'alipay-sdk';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PayService implements OnModuleInit{
    constructor(private readonly configService: ConfigService) {}
    public alipaySdk: AlipaySdk;
    onModuleInit() {
        const appId = this.configService.get<string>('ALIPAY_APP_ID');
        if (!appId) return;
        this.alipaySdk = new AlipaySdk({
            appId,
            privateKey: this.configService.get<string>('ALIPAY_PRIVATE_KEY')!,
            alipayPublicKey: this.configService.get<string>('ALIPAY_PUBLIC_KEY')!,
            gateway: this.configService.get<string>('ALIPAY_GATEWAY')!,
        });
    }
    getAlipaySdk() {
        return this.alipaySdk;
    }
}
