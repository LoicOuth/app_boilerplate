<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Avatar>
        <AvatarImage :src="user?.avatar || ''" />
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
      <Theme />
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="showLogoutDialog = true">
        <LogOutIcon class="mr-2 text-destructive" />
        Se déconnecter
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

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

<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/shared/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/shared/ui/dropdown-menu'
import { LayoutDashboardIcon, LogOutIcon, UserRoundCogIcon } from 'lucide-vue-next'
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
import { Button } from '~/components/shared/ui/button'
import { computed, ref } from 'vue'
import { useUser } from '~/composables/use_user'
import Theme from '~/components/shared/menu/theme.vue'

const { user } = useUser()

const showLogoutDialog = ref(false)
const logoutProcessing = ref(false)

const userInitiale = computed(
  () =>
    user.value &&
    `${user.value.firstName.charAt(0).toUpperCase()} ${user.value.lastName.charAt(0).toUpperCase()}`
)

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
