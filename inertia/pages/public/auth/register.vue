<script setup lang="ts">
import GoogleIcon from '~/assets/images/google_icon.vue'
import { CheckCircleIcon } from 'lucide-vue-next'

const { t } = useI18n()

const success = computed(() => usePage().props.success as string | undefined)

const formData = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})
</script>

<template>
  <Head :title="t('register.head')" />

  <div v-if="success" class="flex flex-col items-center justify-center gap-5">
    <CheckCircleIcon class="text-green-500" :size="120" />
    <div class="text-lg">{{ t(success) }}</div>
  </div>

  <div v-else class="flex flex-col gap-5">
    <Button variant="outline" @click="router.get('/google/redirect')">
      <GoogleIcon class="mr-3" />
      {{ t('register.googleRegister') }}
    </Button>

    <Separator />

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <Label for="name">{{ t('register.name') }}</Label>
        <Input v-model="formData.name" id="name" placeholder="Joe Robinson" required />
        <span v-if="formData.errors.name" class="text-red-500 text-xs">
          {{ formData.errors.name[0] }}
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="email">{{ t('register.email') }}</Label>
        <Input
          v-model="formData.email"
          id="email"
          type="email"
          placeholder="m@example.com"
          required
        />
        <span v-if="formData.errors.email" class="text-red-500 text-xs">
          {{ formData.errors.email[0] }}
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="password">{{ t('register.password') }}</Label>
        <Input v-model="formData.password" id="password" type="password" />
        <span v-if="formData.errors.password" class="text-red-500 text-xs">
          {{ formData.errors.password[0] }}
        </span>
      </div>
      <div class="flex flex-col gap-2">
        <Label for="password_confirmation">{{ t('register.confirmedPassword') }}</Label>
        <Input
          v-model="formData.password_confirmation"
          id="password_confirmation"
          type="password"
        />
      </div>
      <Button
        type="submit"
        class="w-full"
        :loading="formData.processing"
        @click="formData.post('/register')"
      >
        {{ t('register.create') }}
      </Button>
      <div class="mt-2 text-center text-sm">
        {{ t('register.alreadyHaveAccount') }}
        <Link href="/login" class="underline">{{ t('register.signIn') }}</Link>
      </div>
    </div>
  </div>
</template>
