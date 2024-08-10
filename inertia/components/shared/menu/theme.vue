<script setup lang="ts">
import { ThemCoookieKey, Theme } from '#types/theme'
import { SunMoonIcon } from 'lucide-vue-next'

const theme = ref<Theme>()

const toggleTheme = () => {
  const expiryDate = new Date(new Date().getDate() + 365)

  if (theme.value === Theme.Light && !document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.add('dark')
    document.cookie = `${ThemCoookieKey}=${Theme.Dark}; SameSite=lax; expires=${expiryDate.toUTCString()}; Path=/;`
    theme.value = Theme.Dark
  } else if (theme.value === Theme.Dark && document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark')
    document.cookie = `${ThemCoookieKey}=${Theme.Light}; expires=${expiryDate.toUTCString()}; Path=/;`
    theme.value = Theme.Light
  }
}

onMounted(() => {
  if (document.documentElement.classList.contains('dark')) {
    theme.value = Theme.Dark
  } else if (!document.documentElement.classList.contains('dark')) {
    theme.value = Theme.Light
  }
})
</script>

<template>
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <SunMoonIcon class="mr-2" />
      Thème
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup :model-value="theme" @update:model-value="toggleTheme()">
          <DropdownMenuRadioItem :value="Theme.Dark"> Sombre </DropdownMenuRadioItem>
          <DropdownMenuRadioItem :value="Theme.Light"> Clair </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</template>
