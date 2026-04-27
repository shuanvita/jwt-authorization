import { useStorage } from '@vueuse/core'

export const accessToken = useStorage<string | null>('accessToken', null)
