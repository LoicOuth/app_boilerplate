<script setup lang="ts">
import { Toaster } from '~/components/shared/ui/sonner'
import { toast } from 'vue-sonner'
import { computed, watch } from 'vue'
import { usePage } from '@inertiajs/vue3'
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
  <Toaster richColors />
</template>
