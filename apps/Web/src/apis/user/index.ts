import { serverApi,refreshApi } from "..";
import type { UserLogin, UserRegister, WebResultUser,Token,AvatarResult,UserUpdate } from "@en/common/user";
import type { Response } from "..";
export const registerApi = (params: UserRegister): Promise<Response<WebResultUser>> => {
    return serverApi.post('/user/register', params) as Promise<Response<WebResultUser>>
}
export const loginApi = (params: UserLogin): Promise<Response<WebResultUser>> => {
    return serverApi.post('/user/login', params) as Promise<Response<WebResultUser>>
}
export const refreshTokenApi = (data: Omit<Token, 'accessToken'>) => refreshApi.post('/user/refresh-token', data) as Promise<Response<Token>>

//更新用户信息
export const updateUser = (data: UserUpdate) => serverApi.post('/user/update-user', data) as Promise<Response<UserUpdate>>
//上传头像
export const uploadAvatarApi = (data: FormData) => serverApi.post('/user/upload-avatar', data) as Promise<Response<AvatarResult>>