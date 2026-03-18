import { serverApi,refreshApi } from "..";
import type { UserLogin, UserRegister, WebResultUser,Token } from "@en/common/user";
import type { Response } from "..";
export const registerApi = (params: UserRegister): Promise<Response<WebResultUser>> => {
    return serverApi.post('/user/register', params) as Promise<Response<WebResultUser>>
}
export const loginApi = (params: UserLogin): Promise<Response<WebResultUser>> => {
    return serverApi.post('/user/login', params) as Promise<Response<WebResultUser>>
}
export const refreshTokenApi = (data: Omit<Token, 'accessToken'>) => refreshApi.post('/user/refresh-token', data) as Promise<Response<Token>>