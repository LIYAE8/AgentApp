"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const transformBigInt = (data) => {
    if (typeof data === 'bigint') {
        return data.toString();
    }
    if (Array.isArray(data)) {
        return data.map(transformBigInt);
    }
    if (typeof data === 'object' && data !== null) {
        if (data instanceof Date) {
            return data;
        }
        return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, transformBigInt(value)]));
    }
    return data;
};
let Interceptor = class Interceptor {
    intercept(context, next) {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            return {
                timestmap: new Date().toISOString(),
                data: transformBigInt(data.data) ?? null,
                path: request.url,
                message: data.message ?? 'success',
                code: data.code ?? 200,
            };
        }));
    }
};
exports.Interceptor = Interceptor;
exports.Interceptor = Interceptor = __decorate([
    (0, common_1.Injectable)()
], Interceptor);
//# sourceMappingURL=interceptor.interceptor.js.map