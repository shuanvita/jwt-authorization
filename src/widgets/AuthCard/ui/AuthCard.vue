<script setup lang="ts">

import {VSvg} from "@/shared/ui/VSvg";
import {AuthBySocial} from "@/features/AuthBySocial";

const onSubmit = () => {
  console.log('submit')
}

const onSubmitInvalid = () => {
  console.log('Invalid credentials. Please try again.')
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
        label="Email"
        validation="required|email"
        autocomplete="email"
        placeholder="user@example.com"
      />
      <FormKit
        type="password"
        name="Password"
        label="Password"
        placeholder="••••••••"
        autocomplete="current-password"
        validation="required"
        :validation-messages="{ required: 'Password must be at least 6 characters' }"
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
        <button type="button" class="text-accent hover:text-fg duration-200 cursor-pointer">
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
</template>
