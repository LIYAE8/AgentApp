import { CallHandler, ExecutionContext, Injectable, NestInterceptor , HttpException} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Request } from 'express';
//同步 异步 then catch ->数据流->pipe -> map filter -> 返回



const transformBigInt = (data: any) => {
  if (typeof data === 'bigint') {
    return data.toString();
  }
  if(Array.isArray(data)){
    return data.map(transformBigInt);
  }
  if(typeof data === 'object' && data !== null){
    if(data instanceof Date){
      return data
    }
    return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, transformBigInt(value)]));
  }
  return data;
};

@Injectable()
export class Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();
    return next.handle().pipe(map((data) => {
      return {
        timestmap: new Date().toISOString(),
        data: transformBigInt(data.data) ?? null,
        // test:data,
        path: request.url,
        message: data.message ?? 'success',//业务逻辑自定义
        code: response.statusCode ?? 200,//业务逻辑自定义
        success: true,
      };
    }));
  }
}
