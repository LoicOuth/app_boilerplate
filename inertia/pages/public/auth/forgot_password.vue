<script setup lang="ts">
import { useForm, Link, usePage } from '@inertiajs/vue3'
import { ArrowLeftIcon, CheckCircleIcon } from 'lucide-vue-next'
import { computed } from 'vue'
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
const success = computed(() => usePage().props.success as string | undefined)

const formData = useForm({
  email: '',
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
        <CardTitle>Réinitialiser le mot de passe</CardTitle>
        <CardDescription>
          Saisissez l'adresse électronique associée à votre compte et nous vous enverrons par
          courrier électronique les instructions pour réinitialiser votre mot de passe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="!success" class="flex flex-col gap-5">
          <div class="flex flex-col gap-2">
            <Label for="email">Addresse email</Label>
            <Input
              v-model="formData.email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            <span v-if="formData.errors.email || errors" class="text-red-500 text-xs">
              {{ formData.errors.email?.[0] || errors }}
            </span>
          </div>

          <Button
            type="submit"
            class="w-full"
            :loading="formData.processing"
            @click="formData.post('forgot-password')"
          >
            Envoyer les instructions
          </Button>
        </div>
        <div v-else class="flex flex-col items-center justify-center gap-5">
          <CheckCircleIcon class="text-green-500" :size="120" />
          <div class="text-lg">L'Email avec les informations a bien été envoyé !</div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
