<script setup lang="ts">
import { LayoutDashboardIcon, LogOutIcon, UserRoundCogIcon } from 'lucide-vue-next'
import UserAvatar from '~/components/shared/user/UserAvatar.vue'

const { t } = useI18n()
const { user } = useUser()

const showLogoutDialog = ref(false)
const logoutProcessing = ref(false)

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
  <DropdownMenu>
    <DropdownMenuTrigger>
      <UserAvatar :user="user" size="sm" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-52">
      <DropdownMenuItem as-child>
        <Link href="/dashboard">
          <LayoutDashboardIcon class="mr-2" />
          {{ t('userMenu.dashboard') }}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem as-child>
        <Link href="/me/details">
          <UserRoundCogIcon class="mr-2" />
          {{ t('userMenu.myAccount') }}
        </Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="showLogoutDialog = true">
        <LogOutIcon class="mr-2 text-destructive" />
        {{ t('userMenu.logout') }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <AlertDialog :open="showLogoutDialog">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ t('userMenu.logoutTitle') }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ t('userMenu.logoutDescription') }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="showLogoutDialog = false">
          {{ t('userMenu.cancel') }}
        </AlertDialogCancel>
        <AlertDialogAction as-child>
          <Button variant="destructive" :loading="logoutProcessing" @click="handleLogout()">
            {{ t('userMenu.logout') }}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
