<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { VSvg } from '@/shared/ui/VSvg'
import { currentUser, logout } from '@/entities/session'

const route = useRoute()
const router = useRouter()

const source = computed(() => {
  const raw = route.query.source
  return raw === 'register' ? 'register' : 'login'
})

const title = computed(() =>
  source.value === 'register' ? 'Registration Successful' : 'Signed In Successfully',
)

const description = computed(() =>
  source.value === 'register'
    ? 'Your account has been created. Welcome aboard!'
    : 'You are now signed in to your account.',
)

const userLabel = computed(() => currentUser.value?.name || currentUser.value?.email || '')

const onSignOut = async () => {
  logout()
  await router.push({ name: 'auth' })
}
</script>

<template>
  <main
    class="min-h-screen grid grid-cols-1 justify-items-center place-content-center px-4"
  >
    <div
      class="flex flex-col items-center text-center sm:p-10 rounded-3xl sm:border border-stroke sm:w-md space-y-6 sm:bg-secondary sm:backdrop-blur-md sm:shadow-md"
    >
      <div
        class="inline-flex p-5 rounded-full border border-stroke-green bg-accent-soft text-accent shadow-[0_0_30px_0_rgba(0,255,136,0.30)]"
      >
        <VSvg icon="checked" :size="40" />
      </div>
      <h1 class="text-title font-bold">{{ title }}</h1>
      <p class="text-fg-muted">{{ description }}</p>

      <div
        v-if="userLabel"
        class="w-full rounded-lg border border-stroke bg-input px-4 py-3 text-fg-muted"
      >
        Signed in as
        <span class="text-fg font-medium">{{ userLabel }}</span>
      </div>

      <button
        type="button"
        class="w-full rounded-lg bg-accent px-4 py-3 font-semibold text-main cursor-pointer hover:bg-accent-soft hover:text-fg duration-200"
        @click="onSignOut"
      >
        Sign Out
      </button>
    </div>
  </main>
</template>
