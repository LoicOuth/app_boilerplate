<script setup lang="ts">
import { ref } from 'vue'
import { MenuIcon, LogInIcon, SunIcon, MoonIcon } from 'lucide-vue-next'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/shared/ui/sheet'
import { useMediaQuery } from '~/composables/use_media_query'
import { Button } from '~/components/shared/ui/button'
import NavLink from '~/components/shared/NavLink.vue'
import { useUser } from '~/composables/use_user'
import { useForm } from '@inertiajs/vue3'
import { Theme } from '#types/theme'

const { isMobile } = useMediaQuery()
const { isThemeDark, theme } = useUser()

const isOpen = ref(false)

const themeFormData = useForm({
  theme: theme.value,
})

const toggleTheme = () => {
  themeFormData.theme = isThemeDark.value ? Theme.Light : Theme.Dark
  if (themeFormData.theme === Theme.Dark && !document.documentElement.classList.contains('dark')) {
    document.documentElement.classList.add('dark')
  } else if (
    themeFormData.theme === Theme.Light &&
    document.documentElement.classList.contains('dark')
  ) {
    document.documentElement.classList.remove('dark')
  }

  themeFormData.post('/me/theme')
}
</script>

<template>
  <div vaul-drawer-wrapper class="flex min-h-screen flex-col bg-background">
    <header class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
      <div class="container flex h-14 max-w-screen-2xl items-center gap-6">
        <Sheet v-if="isMobile" v-model:open="isOpen">
          <SheetTrigger as-child>
            <Button variant="ghost" size="icon">
              <MenuIcon :size="30" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader class="text-left">
              <SheetTitle>Logo</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <template v-else>
          <NavLink to="/" text="Accueil" />
          <NavLink to="/about" text="A propos" />
        </template>

        <div class="flex flex-1 items-center space-x-2 justify-end">
          <Button variant="ghost">
            <LogInIcon :size="20" class="mr-2" />
            <span>Se connecter</span>
          </Button>
          <Button variant="ghost" size="icon" @click="toggleTheme()">
            <SunIcon v-if="isThemeDark" />
            <MoonIcon v-else />
          </Button>
        </div>
      </div>
    </header>
    <div class="flex-1 bg-background">
      <main class="container">
        <slot />
      </main>
    </div>
  </div>
</template>
