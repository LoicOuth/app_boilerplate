<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/shared/ui/breadcrumb'
import { Button } from '~/components/shared/ui/button'
import { useProfileBreadcrumb } from '~/composables/use_breadcrumb'
import { MonitorUpIcon, ShieldIcon, UserCogIcon } from 'lucide-vue-next'
import { Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import { Separator } from '~/components/shared/ui/separator'
import { useScreenMediaQuery } from '~/composables/use_screen_media_query'

const { breadcrumbProfileItems } = useProfileBreadcrumb()
const { mdAndDown } = useScreenMediaQuery()

const currentUrl = computed(() => usePage().url)
</script>

<template>
  <Breadcrumb class="mt-3">
    <BreadcrumbList>
      <template v-for="(item, index) in breadcrumbProfileItems" :key="index">
        <BreadcrumbItem>
          <BreadcrumbLink v-if="index !== breadcrumbProfileItems.length - 1" as-child>
            <Link as="a" :href="item.href" class="cursor-pointer">
              {{ item.label }}
            </Link>
          </BreadcrumbLink>
          <BreadcrumbPage v-else>{{ item.label }}</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index !== breadcrumbProfileItems.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>

  <div class="mt-10 pb-16">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Paramétrage du compte</h2>
      <p class="text-muted-foreground">
        Gérer les paramètres de votre compte et définir vos préférences en matière de courrier
        électronique.
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside class="-mx-4 lg:w-1/5">
        <nav class="flex flex-col space-y-1">
          <Button
            variant="ghost"
            as-child
            class="w-full text-left justify-start"
            :class="{ 'bg-muted hover:bg-muted': currentUrl === '/me/details' }"
          >
            <Link as="a" href="/me/details" class="cursor-pointer">
              <UserCogIcon :size="20" class="mr-2" />
              <span>Mes informations</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            as-child
            class="w-full text-left justify-start"
            :class="{ 'bg-muted hover:bg-muted': currentUrl === '/me/security' }"
          >
            <Link as="a" href="/me/security" class="cursor-pointer">
              <ShieldIcon :size="20" class="mr-2" />
              <span>Sécurité</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            as-child
            class="w-full text-left justify-start"
            :class="{ 'bg-muted hover:bg-muted': currentUrl === '/me/connections' }"
          >
            <Link as="a" href="/me/connections" class="cursor-pointer">
              <MonitorUpIcon :size="20" class="mr-2" />
              <span>Connexions</span>
            </Link>
          </Button>
        </nav>
      </aside>
      <Separator v-if="mdAndDown" class="my-6" />
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
