<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue'
import { cn } from '~/utils/shadcn.helper'

const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
</script>

<template>
  <AlertDialogAction v-bind="delegatedProps" :class="cn(props.class)">
    <slot />
  </AlertDialogAction>
</template>
