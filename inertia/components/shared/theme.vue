<template>
  <Button variant="ghost" size="icon" @click="toggleTheme()">
    <SunIcon v-if="isDark" />
    <MoonIcon v-else />
  </Button>
</template>

<script setup lang="ts">
import { ThemCoookieKey, Theme } from '#types/theme'
import { SunIcon, MoonIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import { Button } from '~/components/shared/ui/button'
import { useUser } from '~/composables/use_user'

const { theme } = useUser()

const isDark = ref(theme.value === Theme.Dark)

const toggleTheme = () => {
  if (!isDark.value && !document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.add('dark')
    document.cookie = `${ThemCoookieKey}=${Theme.Dark}; SameSite=lax;`
    isDark.value = true
  } else if (isDark.value && document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.remove('dark')
    document.cookie = `${ThemCoookieKey}=${Theme.Light}; SameSite=lax;`
    isDark.value = false
  }
}
</script>
