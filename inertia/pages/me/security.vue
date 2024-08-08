<script setup lang="ts">
import MeLayout from '~/layouts/me.layout.vue'

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
  setBreadCrumb([{ href: '/me/security', label: 'Sécurité' }])
})
</script>

<template>
  <Head title="Sécurité" />

  <MeLayout>
    <div>
      <h3 class="text-lg font-medium">Sécurité</h3>
      <p class="text-sm text-muted-foreground">Vous pouvez modifier votre mot de passe ici</p>
    </div>
    <Separator />
    <div class="flex flex-col gap-2">
      <Label for="password">Mot de passe</Label>
      <Input v-model="formData.password" id="password" type="password" required />
      <span v-if="formData.errors.password" class="text-red-500 text-xs">
        {{ formData.errors.password[0] }}
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="password_confirmation">Confimer le mot de passe</Label>
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
            Mettre à jour
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Vous ne pouvez pas modifier votre mot de passe car vous êtes connecter avec un service
            tiers
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </MeLayout>
</template>
