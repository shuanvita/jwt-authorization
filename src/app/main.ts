import '@/app/styles/main.css'
import {createApp} from 'vue'
import {plugin, defaultConfig} from '@formkit/vue'
import App from './App.vue'

const app = createApp(App)

app.use(plugin, defaultConfig({
  config: {
    classes: {
      form: 'w-full space-y-4',
      submit: 'w-full rounded-lg bg-accent px-4 py-2 font-semibold text-bg hover:opacity-90 transition disabled:opacity-50',
      outer: 'mb-4',
      label: 'block text-sm font-medium mb-1.5',
      input: 'w-full rounded-lg border border-stroke px-3 py-2 bg-input text-[16px] focus:outline-none',
      help: 'text-xs text-gray-500',
      messages: 'mt-1.5',
      message: 'text-size-caption text-error'
    }
  }
}))
app.mount('#app')
