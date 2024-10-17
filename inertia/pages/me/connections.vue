<script setup lang="ts">
import { type AuthProviderPresenter } from '#auth/presenters/auth_provider_presenter'
import { type AuthProviderNames, AuthProviderNamesArray } from '#types/common'
import { CableIcon } from 'lucide-vue-next'
import GoogleIcon from '~/assets/images/google_icon.vue'
import MeLayout from '~/layouts/Me.layout.vue'

const { t } = useI18n()

const props = defineProps({
  providers: { type: Array as PropType<AuthProviderPresenter[]>, default: [] },
})

const { setBreadCrumb } = useProfileBreadcrumb()

const providerIcons: Record<AuthProviderNames, Component> = {
  google: GoogleIcon,
}

const availableProviders = computed(() =>
  AuthProviderNamesArray.filter((el) => !props.providers.some((p) => p.providerName === el))
)

onMounted(() => {
  setBreadCrumb([{ href: '/me/connections', label: t('profileConnections.title') }])
})
</script>

<template>
  <Head :title="t('profileConnections.head')" />

  <MeLayout>
    <div>
      <h3 class="text-lg font-medium">{{ t('profileConnections.title') }}</h3>
      <p class="text-sm text-muted-foreground">
        {{ t('profileConnections.description') }}
      </p>
    </div>
    <Separator />
    <div v-if="props.providers.length" class="flex flex-col gap-3">
      <Card v-for="provider in props.providers" :key="provider.id">
        <div class="flex items-center p-5">
          <div v-if="provider.providerName === 'google'" class="flex-1 flex items-center">
            <component :is="providerIcons[provider.providerName]" class="mr-3" />
            <h3>Google</h3>
          </div>
          <div class="flex items-center">
            <CableIcon v-if="provider.isConnectedWith" class="mr-3" />
            <TooltipProvider :disabled="!provider?.isConnectedWith">
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="destructive" :disabled="provider.isConnectedWith">
                    {{ t('profileConnections.dissociate') }}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{{ t('profileConnections.cantDissociate') }}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Card>
    </div>
    <div v-else class="flex justify-center text-muted-foreground">
      <p>{{ t('profileConnections.noExternalConection') }}</p>
    </div>
    <!-- TODO: Make service connexions -->
    <div v-if="availableProviders.length" class="flex flex-col items-center">
      <div class="text-lg">{{ t('profileConnections.connected') }}</div>
      <div class="flex items-center gap-3">
        <Button v-for="provider in availableProviders" :key="provider" variant="ghost" size="icon">
          <component :is="providerIcons[provider]" />
        </Button>
      </div>
    </div>
  </MeLayout>
</template>
