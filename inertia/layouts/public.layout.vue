<script setup lang="ts">
import { MenuIcon, LogInIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from 'lucide-vue-next'
import NavLink from '~/components/shared/NavLink.vue'
import Toast from '~/components/shared/Toast.vue'
import Notification from '~/components/shared/Notification.vue'
import UserMenu from '~/components/shared/menu/UserMenu.vue'
import MainLayout from '~/layouts/Main.layout.vue'
import ThemeToggle from '~/components/shared/ThemeToggle.vue'

const { t } = useI18n()
const { mdAndDown, mdAndUp } = useScreenMediaQuery()
const { user } = useUser()

const isOpen = ref(false)
</script>

<template>
  <MainLayout>
    <div vaul-drawer-wrapper class="flex min-h-screen flex-col bg-background">
      <header class="sticky z-40 top-5 right-0 left-0 container">
        <div
          class="flex max-w-screen-2xl items-center gap-6 bg-background/60 backdrop-blur-lg border border-border shadow px-8 py-4 rounded-lg"
        >
          <Sheet v-if="mdAndDown" v-model:open="isOpen">
            <SheetTrigger as-child>
              <Button variant="ghost" size="icon">
                <MenuIcon :size="30" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader class="text-left">
                <SheetTitle> Logo </SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <template v-else-if="mdAndUp">
            <NavLink to="/" :text="t('publicLayout.home')" />
            <NavLink to="/about" text="A propos" />
          </template>

          <div class="flex flex-1 items-center space-x-2 justify-end">
            <ThemeToggle />
            <Notification v-if="user" />
            <UserMenu v-if="user" />
            <Button v-else variant="secondary" as-child>
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
      <footer class="border-t border-border lg:py-8 py-5 px-5">
        <div
          class="flex lg:items-center items-start lg:flex-row flex-col lg:gap-20 gap-10 container"
        >
          <div>Logo</div>
          <div class="flex-1 flex-col">
            <div class="flex items-center gap-5 flex-wrap mt-3">
              <a
                href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/"
                target="_blank"
                class="transition-colors hover:text-foreground text-foreground/40 font-semibold"
              >
                <LinkedinIcon class="h-8 w-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/"
                target="_blank"
                class="transition-colors hover:text-foreground text-foreground/40 font-semibold"
              >
                <InstagramIcon class="h-8 w-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/"
                target="_blank"
                class="transition-colors hover:text-foreground text-foreground/40 font-semibold"
              >
                <TwitterIcon class="h-8 w-8" />
              </a>
            </div>
          </div>
          <div class="flex items-center gap-40">
            <div class="flex flex-col gap-5">
              <h2 class="text-lg font-bold">{{ t('publicLayout.navigation') }}</h2>
              <Link
                href="/"
                class="transition-colors hover:text-foreground/80 text-foreground/40 font-semibold"
              >
                {{ t('publicLayout.home') }}
              </Link>
              <Link
                href="/about"
                class="transition-colors hover:text-foreground/80 text-foreground/40 font-semibold"
              >
                A propos
              </Link>
            </div>
            <div class="flex flex-col gap-5">
              <h2 class="text-lg font-bold">{{ t('publicLayout.informations') }}</h2>
              <Link
                href="/"
                class="transition-colors hover:text-foreground/80 text-foreground/40 font-semibold"
              >
                {{ t('publicLayout.privacyPolicy') }}
              </Link>
              <Link
                href="/about"
                class="transition-colors hover:text-foreground/80 text-foreground/40 font-semibold"
              >
                {{ t('publicLayout.termsOfService') }}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </MainLayout>
</template>
