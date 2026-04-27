import '@/app/styles/main.css'
import {createApp} from 'vue'
import {plugin, defaultConfig} from '@formkit/vue'
import App from './App.vue'
import {router} from '@/app/router'

const app = createApp(App)

app.use(router)
app.use(plugin, defaultConfig({
  config: {
    classes: {
      form: 'w-full space-y-4 bg-secondary sm:bg-transparent rounded-3xl border sm:border-0 border-stroke p-5 sm:p-0',
      submit: 'w-full rounded-lg bg-accent px-4 py-2 font-semibold text-bg hover:opacity-90 transition disabled:opacity-50',
      outer: '$reset mb-4',
      label: 'block text-sm font-medium mb-1.5 cursor-pointer',
      input: 'w-full rounded-lg border border-stroke px-3 py-2 bg-input text-[16px] focus:outline-none',
      help: 'text-xs text-gray-500',
      messages: 'mt-1.5',
      message: 'text-size-caption text-error',
      decorator:
        'h-4 w-4 block rounded-sm bg-input border border-stroke transition peer-checked:border-accent peer-checked:bg-accent-soft peer-focus-visible:ring-4 peer-focus-visible:ring-white/20'
    }
  }
}))
app.mount('#app')
