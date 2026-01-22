import type { App, Plugin } from 'vue'

export default {
    install(app: App){
        app.directive('focus', {
            mounted(el){
                el.focus()
            }
        })
    },
} as Plugin