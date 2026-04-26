<script setup lang="ts">
import type {AuthBySocialProps} from "../model/AuthBySocial.types";
import {VButton} from "@/shared/ui/VButton";

const props = defineProps<AuthBySocialProps>()
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
      <VButton preIcon="google" :iconSize="18">Google</VButton>
      <VButton preIcon="github" :iconSize="18">GitHub</VButton>
    </div>
    <div v-if="props.promptText || props.promptActionText" class="text-fg-muted flex gap-2 justify-center">
      {{ props.promptText }} <a class="text-accent hover:text-fg duration-200" v-if="props.promptActionText" :href="props.promptActionLink">{{ props.promptActionText }}</a>
    </div>
  </div>
</template>
