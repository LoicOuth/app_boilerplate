<script setup lang="ts">
import { type SharedProps } from '@adonisjs/inertia/types'
import { ConfigProvider } from 'radix-vue'
import { useId } from 'vue'

const useIdFunction = () => useId() || ''

const sharedProps = computed(() => usePage<SharedProps>().props)

// watch(
//   sharedProps,
//   () => {
//     if (sharedProps.value.toastSuccess) {
//       toast.success(sharedProps.value.toastSuccess)
//     }

//     if (sharedProps.value.toastError) {
//       toast.error(sharedProps.value.toastError)
//     }
//   },
//   {
//     deep: true,
//   }
// )
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <Sonner richColors />
    <slot />
  </ConfigProvider>
</template>
