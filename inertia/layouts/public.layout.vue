<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  MenuIcon,
  LogInIcon,
  SunIcon,
  MoonIcon,
  LayoutDashboardIcon,
  UserRoundCogIcon,
  LogOutIcon,
} from 'lucide-vue-next'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/shared/ui/sheet'
import { Button } from '~/components/shared/ui/button'
import NavLink from '~/components/shared/nav_link.vue'
import { Link, router } from '@inertiajs/vue3'
import { ThemCoookieKey, Theme } from '#types/theme'
import { useScreenMediaQuery } from '~/composables/use_screen_media_query'
import { useUser } from '~/composables/use_user'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/shared/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/shared/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '~/components/shared/ui/alert-dialog'

const { mdAndDown, mdAndUp } = useScreenMediaQuery()
const { theme, user } = useUser()

const isOpen = ref(false)
const isDark = ref(theme.value === Theme.Dark)
const showLogoutDialog = ref(false)
const logoutProcessing = ref(false)

const userInitiale = computed(
  () =>
    user.value &&
    `${user.value.firstName.charAt(0).toUpperCase()} ${user.value.lastName.charAt(0).toUpperCase()}`
)

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
const handleLogout = () => {
  logoutProcessing.value = true
  router.post(
    '/logout',
    {},
    {
      onSuccess: () => {
        showLogoutDialog.value = false
      },
      onFinish: () => {
        logoutProcessing.value = false
      },
    }
  )
}
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
          <DropdownMenu v-if="user">
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage :src="user.avatar || ''" />
                <AvatarFallback>{{ userInitiale }}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="min-w-52">
              <DropdownMenuItem as-child>
                <Link href="/dashboard">
                  <LayoutDashboardIcon class="mr-2" />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserRoundCogIcon class="mr-2" />
                Mon compte
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="showLogoutDialog = true">
                <LogOutIcon class="mr-2 text-destructive" />
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button v-else variant="ghost" as-child>
            <Link as="a" href="/login">
              <LogInIcon :size="20" class="mr-2" />
              <span>Se connecter</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" @click="toggleTheme()">
            <SunIcon v-if="isDark" />
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

  <AlertDialog :open="showLogoutDialog">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Voulez-vous vraiment vous déconnectez ?</AlertDialogTitle>
        <AlertDialogDescription>
          Une fois déconnecter vous n'aurez plus accès a l'application
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="showLogoutDialog = false">Annuler</AlertDialogCancel>
        <AlertDialogAction as-child>
          <Button variant="destructive" :loading="logoutProcessing" @click="handleLogout()">
            Se déconnecter
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
