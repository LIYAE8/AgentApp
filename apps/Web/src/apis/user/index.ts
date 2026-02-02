import { serverApi } from "..";
import type { UserLogin, UserRegister, User } from "@en/common/user";
import type { Response } from "..";
export const registerApi = (params: UserRegister): Promise<Response<User>> => {
    return serverApi.post('/user/register', params) as Promise<Response<User>>
}
export const loginApi = (params: UserLogin): Promise<Response<User>> => {
    return serverApi.post('/user/login', params) as Promise<Response<User>>
}