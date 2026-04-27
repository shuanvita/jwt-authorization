<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import type { AuthBySocialProps } from '../model/AuthBySocial.types'
import { loginWithOAuth, type OAuthProvider } from '../api/oauth'
import { accessToken } from '@/shared/lib/token'
import { HttpError } from '@/shared/api'
import { VButton } from '@/shared/ui/VButton'
import { VAlert } from '@/shared/ui/VAlert'

const props = defineProps<AuthBySocialProps>()

const router = useRouter()
const loadingProvider = ref<OAuthProvider | null>(null)
const error = ref('')

const onOAuth = async (provider: OAuthProvider) => {
  if (loadingProvider.value) return
  loadingProvider.value = provider
  error.value = ''
  try {
    const { access_token } = await loginWithOAuth(provider)
    accessToken.value = access_token
    await router.push({ name: 'welcome', query: { source: 'login' } })
  } catch (e) {
    error.value =
      e instanceof HttpError
        ? e.message
        : 'Authorization failed. Please try again.'
  } finally {
    loadingProvider.value = null
  }
}
</script>

<template>
  <div class="w-full space-y-8">
    <div v-if="props.title" class="flex items-center gap-4 py-2">
      <span class="flex-1 h-px bg-stroke"/>
      <h3 class="text-size-caption uppercase tracking-[1.2px] text-fg-muted">
        {{ props.title }}
      </h3>
      <span class="flex-1 h-px bg-stroke"/>
    </div>
    <div class="flex flex-col items-center lg:flex-row gap-3">
      <VButton
        preIcon="google"
        :iconSize="18"
        :disabled="loadingProvider !== null"
        @click="onOAuth('google')"
      >
        {{ loadingProvider === 'google' ? 'Signing in…' : 'Google' }}
      </VButton>
      <VButton
        preIcon="github"
        :iconSize="18"
        :disabled="loadingProvider !== null"
        @click="onOAuth('github')"
      >
        {{ loadingProvider === 'github' ? 'Signing in…' : 'GitHub' }}
      </VButton>
    </div>
    <div v-if="props.promptText || props.promptActionText" class="text-fg-muted flex gap-2 justify-center">
      {{ props.promptText }}
      <RouterLink
        v-if="props.promptActionText && props.promptActionLink"
        :to="props.promptActionLink"
        class="text-accent hover:text-fg duration-200"
      >
        {{ props.promptActionText }}
      </RouterLink>
    </div>
  </div>

  <VAlert v-if="error" floating :duration="5000" @close="error = ''">
    {{ error }}
  </VAlert>
</template>
