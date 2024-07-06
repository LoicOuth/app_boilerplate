<script setup lang="ts">
import { ref } from 'vue'
import { MenuIcon, LogInIcon } from 'lucide-vue-next'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/shared/ui/sheet'
import { Button } from '~/components/shared/ui/button'
import NavLink from '~/components/shared/nav_link.vue'
import { Link } from '@inertiajs/vue3'
import { useScreenMediaQuery } from '~/composables/use_screen_media_query'
import { useUser } from '~/composables/use_user'
import Notification from '~/components/shared/notification.vue'
import { Toaster } from '~/components/shared/ui/sonner'
import Theme from '~/components/shared/theme.vue'
import UserMenu from '~/components/shared/userMenu.vue'

const { mdAndDown, mdAndUp } = useScreenMediaQuery()
const { user } = useUser()

const isOpen = ref(false)
</script>

<template>
  <div vaul-drawer-wrapper class="flex min-h-screen flex-col bg-background">
    <header class="sticky z-40 top-0 bg-background/80 backdrop-blur-lg border-b border-border">
      <div class="container flex h-14 max-w-screen-2xl items-center gap-6">
        <Sheet v-if="mdAndDown" v-model:open="isOpen">
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

        <template v-else-if="mdAndUp">
          <NavLink to="/" text="Accueil" />
          <NavLink to="/about" text="A propos" />
        </template>

        <div class="flex flex-1 items-center space-x-2 justify-end">
          <UserMenu v-if="user" />
          <Button v-else variant="ghost" as-child>
            <Link as="a" href="/login">
              <LogInIcon :size="20" class="mr-2" />
              <span>Se connecter</span>
            </Link>
          </Button>
          <Theme />
          <Notification v-if="user" />
        </div>
      </div>
    </header>
    <div class="flex-1 bg-background">
      <Toaster />

      <main class="container">
        <slot />
      </main>
    </div>
  </div>
</template>
