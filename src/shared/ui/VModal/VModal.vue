<script setup lang="ts">
import { computed, useId, useTemplateRef } from 'vue'
import { onKeyStroke, useScrollLock } from '@vueuse/core'
import { VButton } from '@/shared/ui/VButton'
import type { VModalEmits, VModalProps } from './VModal.types'

const props = withDefaults(defineProps<VModalProps>(), {
  closeOnBackdrop: true,
  closeOnEsc: true,
  hideCloseButton: false,
  lockScroll: true,
  size: 'md',
})

const emit = defineEmits<VModalEmits>()

const titleId = useId()
const bodyLock = useScrollLock(typeof document !== 'undefined' ? document.body : null)

const sizeClasses: Record<NonNullable<VModalProps['size']>, string> = {
  sm: 'w-full max-w-sm',
  md: 'w-full max-w-md',
  lg: 'w-full max-w-lg',
  xl: 'w-full max-w-2xl',
  full: 'w-full h-full max-w-none rounded-none',
  custom: '',
}

const panelClasses = computed(() => [
  'relative flex flex-col bg-main border border-stroke rounded-2xl shadow-2xl text-fg',
  'max-h-[90vh] overflow-hidden',
  sizeClasses[props.size],
  props.panelClass,
])

const close = () => {
  if (!props.open) return
  emit('update:open', false)
  emit('close')
}

const onBackdropClick = (event: MouseEvent) => {
  if (!props.closeOnBackdrop) return
  if (event.target === event.currentTarget) close()
}

onKeyStroke('Escape', (event) => {
  if (!props.open || !props.closeOnEsc) return
  event.preventDefault()
  close()
})

const panelRef = useTemplateRef<HTMLElement>('panelRef')

const onAfterEnter = () => {
  panelRef.value?.focus()
}

const onBeforeEnter = () => {
  if (props.lockScroll) bodyLock.value = true
}

const onAfterLeave = () => {
  if (props.lockScroll) bodyLock.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition
      name="v-modal"
      appear
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
      @after-leave="onAfterLeave"
    >
      <div
        v-if="props.open"
        class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
        role="presentation"
        @mousedown.self="onBackdropClick"
      >
        <div
          ref="panelRef"
          :class="panelClasses"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="props.title ? titleId : undefined"
          :aria-label="!props.title ? props.ariaLabel : undefined"
          tabindex="-1"
        >
          <header
            v-if="$slots.header || props.title || !props.hideCloseButton"
            class="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-stroke"
          >
            <slot name="header">
              <h2
                v-if="props.title"
                :id="titleId"
                class="text-title font-semibold leading-tight"
              >
                {{ props.title }}
              </h2>
              <span v-else />
            </slot>
            <VButton
              v-if="!props.hideCloseButton"
              variant="custom"
              icon="close"
              :icon-size="20"
              aria-label="Close"
              class="shrink-0 -mr-2 -mt-1 p-2 rounded-md text-fg-muted hover:text-fg hover:bg-input cursor-pointer duration-200"
              @click="close"
            />
          </header>

          <div class="px-6 py-5 overflow-y-auto">
            <slot />
          </div>

          <footer
            v-if="$slots.footer"
            class="flex items-center justify-end gap-2 px-6 py-4 border-t border-stroke"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.v-modal-enter-active,
.v-modal-leave-active {
  transition: opacity 200ms ease;
}

.v-modal-enter-active > div,
.v-modal-leave-active > div {
  transition:
    transform 200ms ease,
    opacity 200ms ease;
}

.v-modal-enter-from,
.v-modal-leave-to {
  opacity: 0;
}

.v-modal-enter-from > div,
.v-modal-leave-to > div {
  transform: translateY(8px) scale(0.98);
  opacity: 0;
}
</style>
