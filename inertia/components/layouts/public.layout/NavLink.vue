<script setup lang="ts">
import { type RouteNameType } from '#types/common'

const props = defineProps<{
  route: RouteNameType
  text: string
}>()
const isActive = useIsRouteActive(props.route)
</script>

<template>
  <Link
    as="a"
    :route="props.route"
    :params="undefined"
    class="transition-colors hover:text-foreground/80 text-foreground/60 font-semibold"
    :class="{ '!text-foreground': isActive }"
  >
    {{ props.text }}
  </Link>
</template>
