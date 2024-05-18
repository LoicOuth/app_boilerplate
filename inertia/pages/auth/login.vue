<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import GoogleIcon from '~/assets/images/google_icon.vue'
import { Button } from '~/components/shared/ui/button'
import { Input } from '~/components/shared/ui/input'
import { Label } from '~/components/shared/ui/label'
import { Separator } from '~/components/shared/ui/separator'
</script>

<template>
  <Head title="Se connecter" />
  <div class="flex flex-col gap-5">
    <Button variant="outline">
      <GoogleIcon class="mr-2" />
      Se connecter avec google
    </Button>

    <Separator />

    <div class="flex flex-col gap-2">
      <Label for="email">Addresse email</Label>
      <Input id="email" type="email" placeholder="m@example.com" required />
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex items-center">
        <Label for="password">Mot de passe</Label>
        <a href="#" class="ml-auto inline-block text-sm underline"> Mot de passe oublié ? </a>
      </div>
      <Input id="password" type="password" required />
    </div>
    <Button type="submit" class="w-full"> Se connecter </Button>
    <div class="mt-2 text-center text-sm">
      Vous n'avez pas encore de compte ?
      <Link href="/register" class="underline"> s'enregistrer </Link>
    </div>
  </div>
</template>
