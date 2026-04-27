<script setup lang="ts">
import { computed, watch } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { VSvg } from '@/shared/ui/VSvg'
import type { VAlertEmits, VAlertProps, VAlertVariant } from './VAlert.types'

const props = withDefaults(defineProps<VAlertProps>(), {
  variant: 'error',
  closable: true,
  floating: false,
  duration: 0,
})

const emit = defineEmits<VAlertEmits>()

const variantClasses: Record<VAlertVariant, string> = {
  error: 'border-error/40 bg-error/10 text-error',
  success: 'border-stroke-green bg-accent-soft text-accent',
  warning: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400',
  info: 'border-stroke bg-input text-fg-muted',
}

const variantIcons: Record<VAlertVariant, string> = {
  error: 'error',
  success: 'checked',
  warning: 'error',
  info: 'error',
}

const wrapperClasses = computed(() => [
  'flex items-center gap-3 rounded-lg border px-4 py-3 bg-main/90 backdrop-blur-sm',
  props.floating ? 'shadow-2xl pointer-events-auto' : 'w-full',
  variantClasses[props.variant],
])

const iconName = computed(() => props.icon ?? variantIcons[props.variant])

const { start, stop } = useTimeoutFn(() => emit('close'), () => props.duration, {
  immediate: false,
})

watch(
  () => props.duration,
  (value) => {
    stop()
    if (value > 0) start()
  },
  { immediate: true },
)
</script>

<template>
  <Teleport to="body" :disabled="!props.floating">
    <div
      :class="
        props.floating
          ? 'fixed top-4 right-4 z-50 max-w-sm w-[calc(100vw-2rem)] pointer-events-none'
          : 'contents'
      "
    >
      <div :class="wrapperClasses" role="alert">
        <VSvg :icon="iconName" :size="20" class="shrink-0" />
        <div class="flex-1 text-fg text-body">
          <slot />
        </div>
        <button
          v-if="props.closable"
          type="button"
          class="shrink-0 p-1 rounded-md text-fg-muted hover:text-fg cursor-pointer duration-200"
          aria-label="Dismiss"
          @click="emit('close')"
        >
          <VSvg icon="close" :size="16" />
        </button>
      </div>
    </div>
  </Teleport>
</template>

