<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const props = defineProps<{ to: string; text: string }>()

const isActive = computed(() => usePage().url === props.to)
</script>

<template>
  <Link
    :href="props.to"
    class="transition-colors hover:text-foreground/80 text-foreground/60 font-semibold"
    :class="{ '!text-foreground': isActive }"
  >
    {{ props.text }}
  </Link>
</template>
