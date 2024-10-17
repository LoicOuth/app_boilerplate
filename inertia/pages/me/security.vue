<script setup lang="ts">
import MeLayout from '~/layouts/Me.layout.vue'

const { t } = useI18n()
const { setBreadCrumb } = useProfileBreadcrumb()
const { user } = useUser()

const formData = useForm({
  password: '',
  password_confirmation: '',
})

const handleUpdatePassword = () => {
  formData.post('/me/security', {
    onSuccess: () => {
      formData.reset()
    },
  })
}

onMounted(() => {
  setBreadCrumb([{ href: '/me/security', label: t('profileSecurity.title') }])
})
</script>

<template>
  <Head :title="t('profileSecurity.head')" />

  <MeLayout>
    <div>
      <h3 class="text-lg font-medium">{{ t('profileSecurity.title') }}</h3>
      <p class="text-sm text-muted-foreground">{{ t('profileSecurity.description') }}</p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
      <Label for="password">{{ t('profileSecurity.password') }}</Label>
      <Input v-model="formData.password" id="password" type="password" required />
      <span v-if="formData.errors.password" class="text-red-500 text-xs">
        {{ formData.errors.password[0] }}
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="password_confirmation">{{ t('profileSecurity.confirmedPassword') }}</Label>
      <Input
        v-model="formData.password_confirmation"
        id="password_confirmation"
        type="password"
        required
      />
    </div>

    <TooltipProvider :disabled="!user?.isConnectedWithProvider">
      <Tooltip>
        <TooltipTrigger>
          <Button
            :loading="formData.processing"
            :disabled="user?.isConnectedWithProvider"
            @click="handleUpdatePassword()"
          >
            {{ t('profileSecurity.update') }}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {{ t('profileSecurity.cantEdit') }}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </MeLayout>
</template>
