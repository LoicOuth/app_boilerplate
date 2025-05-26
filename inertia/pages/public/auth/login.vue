<script setup lang="ts">
import { TriangleAlertIcon } from 'lucide-vue-next'
import GoogleIcon from '~/assets/images/google_icon.vue'

const { t } = useI18n()

const formData = useForm({
  email: '',
  password: '',
})

const authError = computed(() => usePage<{ authError?: boolean }>().props.authError)
const errors = computed(() => usePage<{ errors?: string }>().props.errors)
</script>

<template>
  <Head :title="t('login.head')" />
  <div class="flex flex-col gap-5">
    <Alert v-if="!!authError" variant="destructive">
      <AlertTitle class="flex items-center">
        <TriangleAlertIcon class="mr-2" />
        {{ t('login.connectionErrorTitle') }}
      </AlertTitle>
      <AlertDescription>{{ t('login.connectionErrorDescription') }}</AlertDescription>
    </Alert>
    <Alert v-if="!!errors" variant="destructive">
      <AlertTitle class="flex items-center">
        <TriangleAlertIcon class="mr-2" />
        {{ t('login.connectionErrorTitle') }}
      </AlertTitle>
      <AlertDescription>{{ t(errors) }}</AlertDescription>
    </Alert>

    <Button variant="outline" @click="router.get('/google/redirect')">
      <GoogleIcon class="mr-3" />
      {{ t('login.connectionWithGoogle') }}
    </Button>

    <Separator />

    <div class="flex flex-col gap-2">
      <Label for="email">{{ t('login.email') }}</Label>
      <Input
        v-model="formData.email"
        id="email"
        type="email"
        placeholder="m@example.com"
        required
      />
      <span v-if="formData.errors.email" class="text-red-500 text-xs">
        {{ formData.errors.email }}
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex items-center">
        <Label for="password">{{ t('login.password') }}</Label>
        <Link as="a" route="forgot-password.index" class="ml-auto inline-block text-sm underline">
          {{ t('login.forgotPassword') }}
        </Link>
      </div>
      <Input v-model="formData.password" id="password" type="password" required />
      <span v-if="formData.errors.password" class="text-red-500 text-xs">
        {{ formData.errors.password }}
      </span>
    </div>
    <Button
      type="submit"
      class="w-full"
      :loading="formData.processing"
      @click="formData.post('login')"
    >
      {{ t('login.signIn') }}
    </Button>
    <div class="mt-2 text-center text-sm">
      {{ t('login.noAccount') }}
      <Link route="register.index" class="underline"> {{ t('login.register') }} </Link>
    </div>
  </div>
</template>
