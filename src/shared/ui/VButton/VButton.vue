<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import type { VButtonProps } from './VButton.types'
import { VSvg } from '@/shared/ui/VSvg'

const props = withDefaults(defineProps<VButtonProps>(), {
  variant: 'default',
  disabled: false,
  type: 'button',
})

const variants = {
  default: 'bg-input rounded-lg gap-2 border border-stroke font-medium w-full hover:bg-accent-soft hover:text-fg duration-200',
  custom: '',
}

const classes = computed(() => {
  if (props.variant === 'custom') {
    return undefined
  }

  return [
    'flex items-center justify-center duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    !props.icon && 'px-4 py-3',
    props.disabled
      ? 'cursor-not-allowed bg-slate-700 text-slate-500'
      : `${variants[props.variant]} cursor-pointer`,
  ]
})

if (import.meta.env.DEV) {
  watchEffect(() => {
    if (props.icon && !props.ariaLabel) {
      console.warn('[VButton]: `ariaLabel` is recommended for icon-only buttons.')
    }
  })
}
</script>

<template>
  <button
    :class="classes"
    :disabled="props.disabled"
    :type="props.type"
    :aria-label="props.ariaLabel"
  >
    <VSvg v-if="props.icon" :icon="props.icon" :size="props.iconSize" />
    <template v-else>
      <VSvg v-if="props.preIcon" :icon="props.preIcon" :size="props.iconSize" />
      <slot />
      <VSvg v-if="props.postIcon" :icon="props.postIcon" :size="props.iconSize" />
    </template>
  </button>
</template>
