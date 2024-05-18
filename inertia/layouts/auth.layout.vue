<script setup lang="ts">
import { router, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/shared/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/shared/ui/tabs'

const currentTab = computed({
  set: (value: string | number) => {
    router.visit(value.toString())
  },

  get: () => usePage().url.split('/')[1],
})
</script>

<template>
  <div class="flex min-h-screen justify-center items-center bg-background">
    <Tabs v-model="currentTab" class="w-[500px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="login"> Se connnecter </TabsTrigger>
        <TabsTrigger value="register"> S'enregistrer </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Se connecter</CardTitle>
            <CardDescription>
              Connectez vous avec votre compte google ou votre email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <slot />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>S'enregistrer</CardTitle>
            <CardDescription>
              Entrer vos informations pour vous inscrire à la plateforme
            </CardDescription>
          </CardHeader>
          <CardContent>
            <slot />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>
