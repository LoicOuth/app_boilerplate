<script setup lang="ts">
const props = defineProps<{ to: string; text: string }>()

const isActive = computed(() => usePage().url === props.to)
</script>

<template>
  <Link
    as="a"
    :href="props.to"
    class="transition-colors hover:text-foreground/80 text-foreground/60 font-semibold"
    :class="{ '!text-foreground': isActive }"
  >
    {{ props.text }}
  </Link>
</template>
