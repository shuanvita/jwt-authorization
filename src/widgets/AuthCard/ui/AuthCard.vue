<script setup lang="ts">

import {VSvg} from "@/shared/ui/VSvg";
</script>

<template>
  <div
    class="flex flex-col items-center p-8 rounded-3xl border border-stroke w-md space-y-8 bg-secondary backdrop-blur-md shadow-md">
    <div
      class="p-3 border border-stroke-green bg-accent-soft rounded-xl shadow-[0_0_15px_0_rgba(0,255,136,0.20)] mb-4">
      <VSvg class="text-accent" icon="lock" :size="24"/>
    </div>
    <h1 class="text-2xl font-bold mb-2">JWT Authorization</h1>
    <div class="text-fg-muted">Enter your credentials to access your account</div>
  </div>
</template>
