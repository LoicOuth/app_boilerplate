<script setup lang="ts">
import { MenuIcon, LogInIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from 'lucide-vue-next'
import NavLink from '~/components/shared/nav_link.vue'
import Toast from '~/components/shared/toast.vue'
import Notification from '~/components/shared/notification.vue'
import User_menu from '~/components/shared/menu/user_menu.vue'

const { t } = useI18n()
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
          <NavLink to="/" :text="t('publicLayout.home')" />
          <NavLink to="/about" text="A propos" />
        </template>

        <div class="flex flex-1 items-center space-x-2 justify-end">
          <Notification v-if="user" />
          <User_menu v-if="user" />
          <Button v-else variant="ghost" as-child>
            <Link as="a" href="/login">
              <LogInIcon :size="20" class="mr-2" />
              <span>{{ t('publicLayout.signIn') }}</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
    <div class="flex-1 bg-background">
      <main class="container">
        <Toast />
        <slot />
      </main>
    </div>
    <footer class="border-t border-border py-20 px-40">
      <div class="flex items-center lg:flex-row flex-col gap-20">
        <div class="flex-1 flex-col">
          <!-- LOGI -->
          <!-- <img src="" /> -->
          <div class="flex items-center gap-5 flex-wrap">
            <a href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/" target="_blank">
              <LinkedinIcon class="h-8 w-8" />
            </a>
            <a href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/" target="_blank">
              <InstagramIcon class="h-8 w-8" />
            </a>
            <a href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/" target="_blank">
              <TwitterIcon class="h-8 w-8" />
            </a>
          </div>
        </div>
        <div class="flex items-center gap-40">
          <div class="flex flex-col gap-5">
            <h2 class="text-lg font-bold">{{ t('publicLayout.navigation') }}</h2>
            <Link
              href="/"
              class="transition-colors hover:text-foreground/80 text-foreground/60 font-semibold"
            >
              {{ t('publicLayout.home') }}
            </Link>
            <Link
              href="/about"
              class="transition-colors hover:text-foreground/80 text-foreground/60 font-semibold"
            >
              A propos
            </Link>
          </div>
          <div class="flex flex-col gap-5">
            <h2 class="text-lg font-bold">{{ t('publicLayout.informations') }}</h2>
            <Link
              href="/"
              class="transition-colors hover:text-foreground/80 text-foreground/60 font-semibold"
            >
              {{ t('publicLayout.privacyPolicy') }}
            </Link>
            <Link
              href="/about"
              class="transition-colors hover:text-foreground/80 text-foreground/60 font-semibold"
            >
              {{ t('publicLayout.termsOfService') }}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
