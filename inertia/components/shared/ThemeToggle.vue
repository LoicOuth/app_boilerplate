<script setup lang="ts">
import { Theme } from '#types/theme'
import { MoonIcon, SunIcon } from 'lucide-vue-next'

const theme = ref<Theme>()

onMounted(() => {
  theme.value = document.documentElement.classList.contains('light') ? Theme.Light : Theme.Dark
})

const toggleTheme = () => {
  if (theme.value === Theme.Dark) {
    document.documentElement.classList.add('light')
    document.documentElement.classList.remove('dark')
    theme.value = Theme.Light
  } else {
    document.documentElement.classList.remove('light')
    document.documentElement.classList.add('dark')
    theme.value = Theme.Dark
  }
  router.put('/me/theme')
}
</script>

<template>
  <Button variant="ghost" size="icon" @click="toggleTheme()">
    <SunIcon v-if="theme === Theme.Dark" />
    <MoonIcon v-else />
  </Button>
</template>
