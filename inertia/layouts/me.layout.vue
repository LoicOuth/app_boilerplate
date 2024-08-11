<script setup lang="ts">
import { MonitorUpIcon, ShieldIcon, UserCogIcon } from 'lucide-vue-next'
import AppBreadcrumb from '~/components/shared/app_breadcrumb.vue'

const { t } = useI18n()
const { mdAndDown } = useScreenMediaQuery()
const { user } = useUser()

const currentUrl = computed(() => usePage().url)
</script>

<template>
  <AppBreadcrumb />

  <div class="mt-10 pb-16">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Paramétrage du compte</h2>
      <p class="text-muted-foreground">
        {{ t('meLayout.description') }}
      </p>
      <p class="text-muted-foreground">
        {{ t('meLayout.validateAccount') }}
        <strong>{{ new Date(user.validatedAt).toLocaleString() }}</strong>
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
              <span>{{ t('meLayout.details') }}</span>
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
              <span>{{ t('meLayout.security') }}</span>
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
              <span>{{ t('meLayout.connection') }}</span>
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
