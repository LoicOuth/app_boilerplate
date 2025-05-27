<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { PanelLeft } from 'lucide-vue-next'
import { cn } from '~/utils/shadcn.helper'
import { Button } from '~/components/shared/ui/button'
import { useSidebar } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { toggleSidebar } = useSidebar()
</script>

<template>
  <Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    :class="cn('size-8', props.class)"
    @click="toggleSidebar"
  >
    <PanelLeft class="size-5" />
    <span class="sr-only">Toggle Sidebar</span>
  </Button>
</template>
