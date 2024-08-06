<script setup lang="ts">
import { Head, Link, useForm, usePage, router } from '@inertiajs/vue3'
import { TriangleAlertIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import GoogleIcon from '~/assets/images/google_icon.vue'
import { Alert, AlertDescription, AlertTitle } from '~/components/shared/ui/alert'
import { Button } from '~/components/shared/ui/button'
import { Input } from '~/components/shared/ui/input'
import { Label } from '~/components/shared/ui/label'
import { Separator } from '~/components/shared/ui/separator'

const formData = useForm({
  email: '',
  password: '',
})

const authError = computed(() => usePage<{ authError?: boolean }>().props.authError)
const toastError = computed(() => usePage<{ toastError?: string }>().props.toastError)
</script>

<template>
  <Head title="Se connecter" />
  <div class="flex flex-col gap-5">
    <Alert v-if="!!authError" variant="destructive">
      <AlertTitle class="flex items-center">
        <TriangleAlertIcon class="mr-2" />
        Erreur de connexion
      </AlertTitle>
      <AlertDescription>Vérifier vos identifiants</AlertDescription>
    </Alert>

    <Alert v-if="!!toastError" variant="destructive">
      <AlertTitle class="flex items-center">
        <TriangleAlertIcon class="mr-2" />
        Erreur de connexion
      </AlertTitle>
      <AlertDescription>{{ toastError }}</AlertDescription>
    </Alert>

    <Button variant="outline" @click="router.get('/google/redirect')">
      <GoogleIcon class="mr-3" />
      Se connecter avec google
    </Button>

    <Separator />

    <div class="flex flex-col gap-2">
      <Label for="email">Addresse email</Label>
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
      <div class="flex items-center">
        <Label for="password">Mot de passe</Label>
        <Link as="a" href="/password/forgot" class="ml-auto inline-block text-sm underline">
          Mot de passe oublié ?
        </Link>
      </div>
      <Input v-model="formData.password" id="password" type="password" required />
      <span v-if="formData.errors.password" class="text-red-500 text-xs">
        {{ formData.errors.password[0] }}
      </span>
    </div>
    <Button
      type="submit"
      class="w-full"
      :loading="formData.processing"
      @click="formData.post('login')"
    >
      Se connecter
    </Button>
    <div class="mt-2 text-center text-sm">
      Vous n'avez pas encore de compte ?
      <Link href="/register" class="underline"> s'enregistrer </Link>
    </div>
  </div>
</template>
