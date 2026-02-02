<template>
    <div>
        <div v-if="isShowLogin" class="fixed inset-0 bg-black opacity-30 filter blur-sm z-40"></div>
        <Transition name="fade">
            <div v-if="isShowLogin" class="fixed inset-30  flex items-center justify-center z-50">
                <div class="w-[1200px] h-[700px] bg-white rounded-[20px] shadow-2xl overflow-hidden flex">
                    <!-- 左侧 3D 模型区域 -->
                    <ModelViewer @changeType="changeType" ref="modelViewerRef" />
                    
                    <!-- 右侧登录表单区域 -->
                    <div class="flex-1 flex flex-col justify-center px-12 py-10 bg-white">
                        <LoginForm v-if="currentType === 'login'" />
                        <RegisterForm v-if="currentType === 'register'" />
                    </div>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import ModelViewer from './ModelViewer.vue'
import LoginForm from './LoginForm.vue'
import RegisterForm from './RegisterForm.vue'
import { inject,ref } from 'vue'
import { IS_SHOW_LOGIN, type LoginType } from './type'
import { useLogin } from '@/hooks/useLogin'
const { hideLogin } = useLogin()
const isShowLogin = inject(IS_SHOW_LOGIN, ref(false))
const currentType = ref<LoginType>('login')
const changeType = (type:LoginType)=>{
    currentType.value = type
}
window.addEventListener('keydown',(e: KeyboardEvent)=>{
    if(e.key === 'Escape'){
        hideLogin()
    }
})
</script>

<style scoped>
    .fade-enter-active,
    .fade-leave-active {
        transition: all 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
        transform: scale(0.5);
    }

    .fade-enter-to,
    .fade-leave-from {
        opacity: 1;
        transform: scale(1);
    }
</style>