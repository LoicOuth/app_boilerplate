<script setup lang="ts">
import { Theme } from '#types/theme'
import { SunMoonIcon } from 'lucide-vue-next'

const { t } = useI18n()

const theme = computed({
  set(value: Theme) {
    if (value === Theme.Light) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
    router.put('/me/theme')
  },
  get: () => (document.documentElement.classList.contains('dark') ? Theme.Dark : Theme.Light),
})
</script>

<template>
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <SunMoonIcon class="mr-2" />
      {{ t('userMenu.theme') }}
    </DropdownMenuSubTrigger>
    <DropdownMenuPortal>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup v-model="theme">
          <DropdownMenuRadioItem :value="Theme.Dark">
            {{ t('userMenu.dark') }}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem :value="Theme.Light">
            {{ t('userMenu.light') }}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuPortal>
  </DropdownMenuSub>
</template>
