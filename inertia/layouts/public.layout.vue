<script setup lang="ts">
import { MenuIcon, LogInIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from 'lucide-vue-next'
import Notification from '~/components/shared/Notification.vue'
import UserMenu from '~/components/shared/menu/UserMenu.vue'
import MainLayout from '~/layouts/Main.layout.vue'
import ThemeToggle from '~/components/shared/ThemeToggle.vue'
import NavLink from '~/components/layouts/public.layout/NavLink.vue'

const { t } = useI18n()
const { mdAndDown, mdAndUp } = useScreenMediaQuery()
const { user } = useUser()

const isOpen = ref(false)
</script>

<template>
  <MainLayout>
    <div vaul-drawer-wrapper class="flex min-h-screen flex-col bg-background">
      <header class="sticky z-40 top-5 right-0 left-0 flex justify-center px-5">
        <div
          class="flex max-w-(--breakpoint-2xl) items-center gap-6 bg-background/60 backdrop-blur-lg border shadow-sm px-8 py-4 rounded-lg w-full"
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
            <NavLink route="home.index" :text="t('publicLayout.home')" />
            <NavLink route="about.index" :text="t('publicLayout.about')" />
          </template>

          <div class="flex flex-1 items-center space-x-2 justify-end">
            <ThemeToggle />
            <Notification v-if="user" />
            <UserMenu v-if="user" />
            <Button v-else as-child size="lg">
              <Link as="a" route="login.index">
                <LogInIcon :size="20" />
                <span>{{ t('publicLayout.signIn') }}</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <div class="flex-1 bg-background">
        <main class="mx-auto px-5 max-w-(--breakpoint-2xl)">
          <slot />
        </main>
      </div>
      <footer class="border-t border lg:py-8 py-5 px-5 ,x">
        <div
          class="flex lg:items-center items-start lg:flex-row flex-col lg:gap-20 gap-10 mx-auto max-w-(--breakpoint-2xl)"
        >
          <div>Logo</div>
          <div class="flex-1 flex-col">
            <div class="flex items-center gap-5 flex-wrap mt-3">
              <a
                href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/"
                target="_blank"
                class="transition-colors hover:text-foreground text-foreground/40 font-semibold"
              >
                <LinkedinIcon class="size-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/"
                target="_blank"
                class="transition-colors hover:text-foreground text-foreground/40 font-semibold"
              >
                <InstagramIcon class="size-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/lo%C3%AFc-outhier-508329180/"
                target="_blank"
                class="transition-colors hover:text-foreground text-foreground/40 font-semibold"
              >
                <TwitterIcon class="size-8" />
              </a>
            </div>
          </div>
          <div class="flex items-center gap-40">
            <div class="flex flex-col gap-5">
              <h2 class="text-lg font-bold">{{ t('publicLayout.navigation') }}</h2>
              <Link
                route="home.index"
                class="transition-colors hover:text-foreground/80 text-foreground/40 font-semibold"
              >
                {{ t('publicLayout.home') }}
              </Link>
              <Link
                route="about.index"
                class="transition-colors hover:text-foreground/80 text-foreground/40 font-semibold"
              >
                {{ t('publicLayout.about') }}
              </Link>
            </div>
            <div class="flex flex-col gap-5">
              <h2 class="text-lg font-bold">{{ t('publicLayout.informations') }}</h2>
              <Link
                route="home.index"
                class="transition-colors hover:text-foreground/80 text-foreground/40 font-semibold"
              >
                {{ t('publicLayout.privacyPolicy') }}
              </Link>
              <Link
                route="about.index"
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
