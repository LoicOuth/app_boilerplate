<script setup lang="ts">
import { Theme } from '#types/theme'
import { MoonIcon, SunIcon } from 'lucide-vue-next'

const { t } = useI18n()

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
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Button variant="ghost" size="icon" @click="toggleTheme()">
          <SunIcon v-if="theme === Theme.Dark" class="size-6" />
          <MoonIcon v-else class="size-6" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ t(`theme.${theme === Theme.Dark ? 'light' : 'dark'}`) }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
