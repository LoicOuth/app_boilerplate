<script setup lang="ts">
import NavLink from '~/components/layouts/me.layout/NavLink.vue'
import AppBreadcrumb from '~/components/shared/AppBreadcrumb.vue'

const { t } = useI18n()
const { mdAndDown } = useScreenMediaQuery()
</script>

<template>
  <AppBreadcrumb />

  <div class="mt-8 pb-16">
    <div class="flex flex-col gap-0.5">
      <h2 class="text-2xl font-bold tracking-tight">{{ t('meLayout.head') }}</h2>
      <p class="text-muted-foreground">
        {{ t('meLayout.description') }}
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col gap-8 lg:flex-row lg:gap-0">
      <aside class="lg:w-1/5 flex gap-5 mr-5">
        <nav class="flex flex-col gap-2 flex-1">
          <NavLink route="me.details.render" icon="UserCog" :text="t('meLayout.details')" />
          <NavLink route="me.security.render" icon="Shield" :text="t('meLayout.security')" />
          <NavLink
            route="me.connections.render"
            icon="MonitorUp"
            :text="t('meLayout.connection')"
          />
        </nav>
        <Separator orientation="vertical" />
      </aside>
      <Separator v-if="mdAndDown" class="my-6" />
      <div class="flex-1 lg:max-w-2xl">
        <div class="flex flex-col gap-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
