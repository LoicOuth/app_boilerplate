<script setup lang="ts">
import { UserPresenter } from '#me/presenters/user_presenter'
import { AvatarVariants } from '~/components/shared/ui/avatar'

const props = defineProps({
  user: { type: Object as PropType<UserPresenter | undefined>, required: true },
  size: { type: String as PropType<AvatarVariants['size']>, default: 'base' },
})

const userInitiale = computed(() => {
  if (props.user) {
    const userNameSplitted = props.user.name.split(' ')

    return `${userNameSplitted[0].charAt(0).toUpperCase()} ${userNameSplitted[1]?.charAt(0).toUpperCase() || ''}`
  }
})
</script>

<template>
  <Avatar :size="props.size" class="relative">
    <AvatarImage :src="props.user?.avatar || ''" />
    <AvatarFallback>{{ userInitiale }}</AvatarFallback>
    <slot />
  </Avatar>
</template>
