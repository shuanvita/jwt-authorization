<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { VSvg } from '@/shared/ui/VSvg'
import { VAlert } from '@/shared/ui/VAlert'
import { AuthBySocial } from '@/features/AuthBySocial'
import { registerByEmail } from '@/features/AuthByEmail'
import { accessToken } from '@/shared/lib/token'
import { HttpError } from '@/shared/api'

const router = useRouter()

const formError = ref('')

const onSubmit = async (data: { email: string; password: string }) => {
  formError.value = ''
  try {
    const res = await registerByEmail({ email: data.email, password: data.password })
    accessToken.value = res.accessToken
    await router.push({ name: 'welcome', query: { source: 'register' } })
  } catch (e) {
    formError.value =
      e instanceof HttpError
        ? e.message
        : 'Registration failed. Please try again.'
  }
}
</script>

<template>
  <div
    class="flex flex-col w-full items-center sm:p-8 rounded-3xl sm:border border-stroke sm:w-md space-y-8 sm:bg-secondary sm:backdrop-blur-md sm:shadow-md"
  >
    <div
      class="p-3 border border-stroke-green bg-accent-soft rounded-xl shadow-[0_0_15px_0_rgba(0,255,136,0.20)] mb-4"
    >
      <VSvg class="text-accent" icon="registration" :size="24" />
    </div>
    <h1 class="text-2xl font-bold mb-2">Create Account</h1>
    <div class="text-fg-muted">Sign up to get started with your new account</div>
    <FormKit
      type="form"
      id="registration"
      :incomplete-message="false"
      :actions="false"
      @submit="onSubmit"
    >
      <FormKit
        type="email"
        name="email"
        label="Email"
        validation="required|email"
        autocomplete="email"
        placeholder="user@example.com"
      />
      <FormKit
        type="password"
        name="password"
        label="Password"
        placeholder="••••••••"
        autocomplete="new-password"
        validation="required|length:6"
        :validation-messages="{ length: 'Password must be at least 6 characters' }"
      />
      <FormKit
        type="password"
        name="password_confirm"
        label="Confirm Password"
        placeholder="••••••••"
        autocomplete="new-password"
        validation="required|confirm"
        validation-label="Password confirmation"
      />
      <FormKit
        type="submit"
        label="Sign Up"
        input-class="$reset w-full rounded-lg bg-accent px-4 py-3 font-semibold text-main cursor-pointer hover:bg-accent-soft hover:text-fg duration-200"
      />
    </FormKit>
    <AuthBySocial
      title="or continue with"
      promptText="Already have an account?"
      promptActionText="Sign In"
      promptActionLink="/"
    />
  </div>

  <VAlert v-if="formError" floating :duration="5000" @close="formError = ''">
    {{ formError }}
  </VAlert>
</template>
