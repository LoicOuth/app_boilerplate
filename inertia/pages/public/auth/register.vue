<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'
import { LoaderCircleIcon } from 'lucide-vue-next'
import { Button } from '~/components/shared/ui/button'
import { Input } from '~/components/shared/ui/input'
import { Label } from '~/components/shared/ui/label'

const formData = useForm({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  password_confirmation: '',
})
</script>

<template>
  <Head title="S'enregistrer" />
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <div class="flex-1 flex flex-col gap-2">
        <Label for="firstName">Prénom</Label>
        <Input v-model="formData.firstName" id="firstName" placeholder="Max" required />
        <span v-if="formData.errors.firstName" class="text-red-500 text-xs">
          {{ formData.errors.firstName[0] }}
        </span>
      </div>
      <div class="flex-1 flex flex-col gap-2">
        <Label for="lastName">Nom de famille</Label>
        <Input v-model="formData.lastName" id="lastName" placeholder="Robinson" required />
        <span v-if="formData.errors.lastName" class="text-red-500 text-xs">
          {{ formData.errors.lastName[0] }}
        </span>
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="email">Adresse email</Label>
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
      <Label for="password">Mot de passe</Label>
      <Input v-model="formData.password" id="password" type="password" />
      <span v-if="formData.errors.password" class="text-red-500 text-xs">
        {{ formData.errors.password[0] }}
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="password_confirmation">Confimer le mot de passe</Label>
      <Input v-model="formData.password_confirmation" id="password_confirmation" type="password" />
    </div>
    <Button
      type="submit"
      class="w-full"
      :loading="formData.processing"
      @click="formData.post('/register')"
    >
      Créer mon compte
    </Button>
    <div class="mt-2 text-center text-sm">
      Vous avez déjà un compte ?
      <Link href="/login" class="underline"> se connecter </Link>
    </div>
  </div>
</template>
