<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { Button } from '~/components/shared/ui/button'
import { Input } from '~/components/shared/ui/input'
import { Label } from '~/components/shared/ui/label'
</script>

<template>
  <Head title="S'enregistrer" />
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <div class="flex-1 flex flex-col gap-2">
        <Label for="firstName">Prénom</Label>
        <Input id="firstName" placeholder="Max" required />
      </div>
      <div class="flex-1 flex flex-col gap-2">
        <Label for="lastName">Nom de famille</Label>
        <Input id="lastName" placeholder="Robinson" required />
      </div>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="email">Adresse email</Label>
      <Input id="email" type="email" placeholder="m@example.com" required />
    </div>
    <div class="flex flex-col gap-2">
      <Label for="password">Mot de passe</Label>
      <Input id="password" type="password" />
    </div>
    <div class="flex flex-col gap-2">
      <Label for="password">Confimer le mot de passe</Label>
      <Input id="password" type="password" />
    </div>
    <Button type="submit" class="w-full"> Créer mon compte </Button>
    <div class="mt-2 text-center text-sm">
      Vous avez déjà un conpte ?
      <Link href="/login" class="underline"> se connecter </Link>
    </div>
  </div>
</template>
