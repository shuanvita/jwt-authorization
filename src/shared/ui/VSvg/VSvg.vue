<script setup lang="ts">
import {computed} from 'vue'
import type {Component} from 'vue'
import type {VSvgProps} from './VSvg.types.ts'

const props = defineProps<VSvgProps>()

const icons = import.meta.glob('/src/shared/assets/svg/*.svg', {
  eager: true,
  import: 'default',
}) as Record<string, Component>

const iconComponent = computed(() => icons[`/src/shared/assets/svg/${props.icon}.svg`])
</script>

<template>
  <component
    :is="iconComponent"
    :width="props.size"
    :height="props.size"
    :style="props.size === undefined ? { width: '100%', height: 'auto', display: 'block' } : null"
    aria-hidden="true"
  />
</template>
