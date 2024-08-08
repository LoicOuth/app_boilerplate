<script setup lang="ts">
import { toast } from 'vue-sonner'
import { SharedProps } from '@adonisjs/inertia/types'

const sharedProps = computed(() => usePage<SharedProps>().props)

watch(
  sharedProps,
  () => {
    if (sharedProps.value.toastSuccess) {
      toast.success(sharedProps.value.toastSuccess)
    }

    if (sharedProps.value.toastError) {
      toast.error(sharedProps.value.toastError)
    }
  },
  {
    deep: true,
  }
)
</script>

<template>
  <Sonner richColors />
</template>
