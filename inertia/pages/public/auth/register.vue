<script setup lang="ts">
import GoogleIcon from '~/assets/images/google_icon.vue'

const formData = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})
</script>

<template>
  <Head title="S'enregistrer" />

  <div class="flex flex-col gap-5">
    <Button variant="outline" @click="router.get('/google/redirect')">
      <GoogleIcon class="mr-3" />
      S'enregistrer avec google
    </Button>

    <Separator />

    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <Label for="name">Nom</Label>
        <Input v-model="formData.name" id="name" placeholder="Joe Robinson" required />
        <span v-if="formData.errors.name" class="text-red-500 text-xs">
          {{ formData.errors.name[0] }}
        </span>
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
        Créer mon compte
      </Button>
      <div class="mt-2 text-center text-sm">
        Vous avez déjà un compte ?
        <Link href="/login" class="underline"> se connecter </Link>
      </div>
    </div>
  </div>
</template>
