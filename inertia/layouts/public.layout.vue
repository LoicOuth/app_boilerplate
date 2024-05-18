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
import { Button } from '~/components/shared/ui/button'
import NavLink from '~/components/shared/nav_link.vue'
import { useUser } from '~/composables/use_user'
import { Link, useForm } from '@inertiajs/vue3'
import { Theme } from '#types/theme'
import { useScreenMediaQuery } from '~/composables/use_screen_media_query'

const { mdAndUp } = useScreenMediaQuery()
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
        <template v-if="mdAndUp">
          <NavLink to="/" text="Accueil" />
          <NavLink to="/about" text="A propos" />
        </template>

        <Sheet v-else v-model:open="isOpen">
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

        <div class="flex flex-1 items-center space-x-2 justify-end">
          <Button variant="ghost" as-child>
            <Link href="/login">
              <LogInIcon :size="20" class="mr-2" />
              <span>Se connecter</span>
            </Link>
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
