<script setup lang="ts">
import { ConfigProvider } from 'radix-vue'
import { useId } from 'vue'

const useIdFunction = () => useId() || ''
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <slot />
  </ConfigProvider>
</template>
