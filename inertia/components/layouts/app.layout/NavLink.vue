<script setup lang="ts">
import type { IconName, RouteNameType } from '#types/common'
import DynamicIcon from '~/components/shared/DynamicIcon.vue'

const props = defineProps<{
  route: RouteNameType
  text: string
  icon: IconName
}>()

const isActive = useIsRouteActive(props.route)
</script>
<template>
  <SidebarMenuItem>
    <SidebarMenuButton asChild :tooltip="props.text" :class="{ 'bg-sidebar-accent': isActive }">
      <Link as="a" :route="props.route" :params="undefined" class="cursor-pointer">
        <DynamicIcon :name="props.icon" class="mr-2 size-6" />
        <span>{{ props.text }}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
</template>
