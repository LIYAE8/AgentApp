import { uploadUrl } from '@/apis'
import {computed} from 'vue'
export const usePreview=(img:any)=>{
    const previewUrl = computed(()=>{
        return uploadUrl + img
    })
    return previewUrl
}