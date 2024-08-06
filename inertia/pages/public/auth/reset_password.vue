<script setup lang="ts">
import { useForm, Link, usePage } from '@inertiajs/vue3'
import { ArrowLeftIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { Alert, AlertDescription } from '~/components/shared/ui/alert'
import { Button } from '~/components/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/shared/ui/card'
import { Input } from '~/components/shared/ui/input'
import { Label } from '~/components/shared/ui/label'

const errors = computed(() => usePage().props.errors)

const props = defineProps({
  id: { type: Number, required: true },
})

const formData = useForm({
  id: props.id,
  password: '',
  password_confirmation: '',
})
</script>

<template>
  <div class="flex min-h-screen justify-center items-center bg-background">
    <Card class="w-[500px]">
      <CardHeader>
        <Button size="icon-xs" variant="ghost" class="mb-2 cursor-pointer" as-child>
          <Link as="a" href="/login">
            <ArrowLeftIcon />
          </Link>
        </Button>
        <CardTitle>Créer un nouveau mot de passe</CardTitle>
        <CardDescription>
          Votre nouveau mot de passe doit être différent du mot de passe utilisé précédemment.
          <Alert v-if="errors" variant="destructive">
            <AlertDescription>
              {{ errors }}
            </AlertDescription>
          </Alert>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-5">
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

          <Button
            type="submit"
            class="w-full"
            :loading="formData.processing"
            :disabled="errors"
            @click="formData.post('/password/reset')"
          >
            Rénitialiser le mot de passe
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
