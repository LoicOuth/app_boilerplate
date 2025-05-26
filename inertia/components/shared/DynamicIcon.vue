<script setup lang="ts">
import { type IconName } from '#types/common'
import * as icons from 'lucide-vue-next'
import { type Component } from 'vue'

const props = defineProps<{
  name: IconName
}>()

const icon = computed<Component>(() => icons[props.name] as Component)
</script>

<template>
  <component :is="icon" />
</template>
