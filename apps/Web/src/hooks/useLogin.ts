import { IS_SHOW_LOGIN } from '@/components/Login/type'
import { inject, ref } from 'vue'
export const useLogin = () => {
    const isShowLogin = inject(IS_SHOW_LOGIN, ref(false))
    const showLogin = () => {
        isShowLogin.value = true
    }
    const hideLogin = () => {
        isShowLogin.value = false
    }
    return {
        showLogin,
        hideLogin
    }
}