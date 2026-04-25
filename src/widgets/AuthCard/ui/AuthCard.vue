<script setup lang="ts">

import {VSvg} from "@/shared/ui/VSvg";

const onSubmit = () => {
  console.log('submit')
}
</script>

<template>
  <div
    class="flex flex-col items-center p-8 rounded-3xl border border-stroke lg:w-md space-y-8 bg-secondary backdrop-blur-md shadow-md">
    <div
      class="p-3 border border-stroke-green bg-accent-soft rounded-xl shadow-[0_0_15px_0_rgba(0,255,136,0.20)] mb-4">
      <VSvg class="text-accent" icon="lock" :size="24"/>
    </div>
    <h1 class="text-2xl font-bold mb-2">JWT Authorization</h1>
    <div class="text-fg-muted">Enter your credentials to access your account</div>
    <FormKit
      type="form"
      id="authorization"
      :actions="false"
      @submit="onSubmit"
    >
      <FormKit
        type="email"
        label="Email"
        validation="required|email"
        messages-class="mt-1"
        placeholder="user@example.com"
      />
      <FormKit
        type="password"
        name="Password"
        value="super-secret"
        label="Password"
        validation="required"
        validation-visibility="live"
        :validation-messages="{ required: 'Password must be at least 6 characters' }"
      />
      <FormKit
        type="submit"
        label="Sign In"
        outer-class="mb-0"
        input-class="$reset w-full rounded-lg bg-accent px-4 py-3 font-semibold text-main cursor-pointer hover:bg-accent-soft hover:text-fg duration-200"
      />
    </FormKit>
  </div>
</template>
