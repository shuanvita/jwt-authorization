<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {VSvg} from "@/shared/ui/VSvg";
import {VModal} from "@/shared/ui/VModal";
import {VAlert} from "@/shared/ui/VAlert";
import {AuthBySocial} from "@/features/AuthBySocial";
import { loginByEmail } from '@/features/AuthByEmail'
import { accessToken } from '@/shared/lib/token'
import { HttpError } from '@/shared/api'

const router = useRouter()

const formError = ref('')

const onSubmit = async (data: { email: string; password: string }) => {
  formError.value = ''
  try {
    const res = await loginByEmail({ email: data.email, password: data.password })
    accessToken.value = res.accessToken
    await router.push({ name: 'welcome', query: { source: 'login' } })
  } catch (e) {
    formError.value =
      e instanceof HttpError
        ? e.message
        : 'Invalid credentials. Please try again.'
  }
}

const onSubmitInvalid = () => {
  formError.value = 'Please fix the errors in the form.'
}

const isForgotPasswordOpen = ref(false)
const isResetEmailSent = ref(false)
const resetEmail = ref('')

const onForgotPasswordSubmit = (data: { email: string }) => {
  resetEmail.value = data.email
  isResetEmailSent.value = true
}

const onForgotPasswordClose = () => {
  isResetEmailSent.value = false
  resetEmail.value = ''
}
</script>

<template>
  <div
    class="flex flex-col w-full items-center sm:p-8 rounded-3xl sm:border border-stroke sm:w-md space-y-8 sm:bg-secondary sm:backdrop-blur-md sm:shadow-md">
    <div
      class="p-3 border border-stroke-green bg-accent-soft rounded-xl shadow-[0_0_15px_0_rgba(0,255,136,0.20)] mb-4">
      <VSvg class="text-accent" icon="lock" :size="24"/>
    </div>
    <h1 class="text-2xl font-bold mb-2">JWT Authorization</h1>
    <div class="text-fg-muted">Enter your credentials to access your account</div>
    <FormKit
      type="form"
      id="authorization"
      :incomplete-message="false"
      :actions="false"
      @submit-invalid="onSubmitInvalid"
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
        autocomplete="current-password"
        validation="required|length:6"
        :validation-messages="{ length: 'Password must be at least 6 characters' }"
      />
      <div class="flex items-center justify-between">
        <FormKit
          type="checkbox"
          label="Remember me"
          name="remember-me"
          :classes="{
            outer: '$reset',
            wrapper: 'flex gap-2 items-center',
            input: '$reset sr-only peer',
            decorator: '',
            label: '$reset text-fg-muted cursor-pointer'
          }"
          :value="false"
        />
        <button
          type="button"
          class="text-accent hover:text-fg duration-200 cursor-pointer"
          @click="isForgotPasswordOpen = true"
        >
          Forgot password?
        </button>
      </div>
      <FormKit
        type="submit"
        label="Sign In"
        input-class="$reset w-full rounded-lg bg-accent px-4 py-3 font-semibold text-main cursor-pointer hover:bg-accent-soft hover:text-fg duration-200"
      />
    </FormKit>
    <AuthBySocial title="or continue with" promptText="Don't have an account?" promptActionText="Sign Up" promptActionLink="/registration"   />
  </div>

  <VAlert
    v-if="formError"
    floating
    :duration="5000"
    @close="formError = ''"
  >
    {{ formError }}
  </VAlert>

  <VModal
    v-model:open="isForgotPasswordOpen"
    size="sm"
    hide-close-button
    :aria-label="isResetEmailSent ? 'Email sent' : 'Reset password'"
    @close="onForgotPasswordClose"
  >
    <button
      type="button"
      class="absolute top-4 right-4 p-1 text-fg-muted hover:text-fg duration-200 cursor-pointer"
      aria-label="Close"
      @click="isForgotPasswordOpen = false"
    >
      <VSvg icon="close" :size="20" />
    </button>

    <template v-if="!isResetEmailSent">
      <div
        class="inline-flex p-3 mb-6 rounded-xl border border-pink-500/20 bg-pink-500/10 text-pink-500"
      >
        <VSvg icon="mail" :size="24" />
      </div>
      <h2 class="text-title font-bold mb-2">Reset Password</h2>
      <p class="text-fg-muted mb-6">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <FormKit
        type="form"
        id="forgot-password"
        :incomplete-message="false"
        :actions="false"
        @submit="onForgotPasswordSubmit"
      >
        <FormKit
          type="email"
          name="email"
          label="Email Address"
          validation="required|email"
          autocomplete="email"
          placeholder="user@example.com"
        />
        <FormKit
          type="submit"
          label="Send Reset Link"
          input-class="$reset w-full rounded-lg bg-accent px-4 py-3 font-semibold text-main cursor-pointer hover:bg-accent-soft hover:text-fg duration-200"
        />
      </FormKit>
      <button
        type="button"
        class="block w-full text-center text-fg-muted hover:text-fg duration-200 cursor-pointer mt-2"
        @click="isForgotPasswordOpen = false"
      >
        Back to Login
      </button>
    </template>

    <template v-else>
      <div class="flex flex-col items-center text-center py-2">
        <div
          class="inline-flex p-4 mb-6 rounded-full border border-stroke-green bg-accent-soft text-accent shadow-[0_0_30px_0_rgba(0,255,136,0.30)]"
        >
          <VSvg icon="checked" :size="32" />
        </div>
        <h2 class="text-title font-bold mb-2">Email Sent</h2>
        <p class="text-fg-muted mb-6">
          We've sent a password reset link to <br />
          {{ resetEmail }}
        </p>
        <button
          type="button"
          class="w-full rounded-lg bg-accent px-4 py-3 font-semibold text-main cursor-pointer hover:bg-accent-soft hover:text-fg duration-200"
          @click="isForgotPasswordOpen = false"
        >
          Back to Login
        </button>
      </div>
    </template>
  </VModal>
</template>
