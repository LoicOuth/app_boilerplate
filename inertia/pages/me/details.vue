<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import { PenIcon } from 'lucide-vue-next'
import { computed, onMounted, ref } from 'vue'
import { Avatar, AvatarImage } from '~/components/shared/ui/avatar'
import { Button } from '~/components/shared/ui/button'
import { Input } from '~/components/shared/ui/input'
import { Label } from '~/components/shared/ui/label'
import { Separator } from '~/components/shared/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/shared/ui/tooltip'
import UserAvatar from '~/components/shared/user/user_avatar.vue'
import { useProfileBreadcrumb } from '~/composables/use_breadcrumb'
import { useUser } from '~/composables/use_user'
import MeLayout from '~/layouts/me.layout.vue'

const { setBreadCrumb } = useProfileBreadcrumb()
const { user } = useUser()

const avatarFileInput = ref()
const formData = useForm({
  email: user.value?.email,
  name: user.value?.name,
  avatar: null as File | null,
})

const avatarFileInputSrc = computed(() => formData.avatar && URL.createObjectURL(formData.avatar))

onMounted(() => {
  setBreadCrumb([{ href: '/me/details', label: 'Mes informations' }])
})
</script>

<template>
  <Head title="Mes informations" />

  <MeLayout>
    <div>
      <h3 class="text-lg font-medium">Mes informations</h3>
      <p class="text-sm text-muted-foreground">
        Vous pouvez modifier vos informations ci-dessous (Nom, Adresse email, avatar)
      </p>
    </div>
    <Separator />

    <Avatar v-if="avatarFileInputSrc" size="lg" class="relative">
      <AvatarImage :src="avatarFileInputSrc || ''" />
    </Avatar>
    <UserAvatar v-else :user="user" size="lg" class="group">
      <div
        v-if="!user?.isConnectedWithProvider"
        class="group-hover:flex absolute top-0 h-full w-full rounded-full bg-opacity-50 bg-black z-10 justify-center hidden items-center cursor-pointer"
        @click="avatarFileInput.click()"
      >
        <PenIcon />
      </div>
    </UserAvatar>
    <input
      ref="avatarFileInput"
      class="hidden"
      type="file"
      @input="formData.avatar = ($event.target as HTMLInputElement).files?.[0] || null"
    />

    <div class="flex flex-col gap-2">
      <Label for="name">Nom</Label>
      <Input
        v-model="formData.name"
        id="name"
        placeholder="Joe robinson"
        :disabled="user?.isConnectedWithProvider || formData.processing"
        required
      />
      <span v-if="formData.errors.name" class="text-red-500 text-xs">
        {{ formData.errors.name[0] }}
      </span>
    </div>
    <div class="flex flex-col gap-2">
      <Label for="email">Addresse email</Label>
      <Input
        v-model="formData.email"
        id="email"
        type="email"
        placeholder="m@example.com"
        :disabled="user?.isConnectedWithProvider || formData.processing"
        required
      />
      <span v-if="formData.errors.email" class="text-red-500 text-xs">
        {{ formData.errors.email[0] }}
      </span>
    </div>

    <TooltipProvider :disabled="!user?.isConnectedWithProvider">
      <Tooltip>
        <TooltipTrigger>
          <Button
            type="submit"
            :loading="formData.processing"
            :disabled="user?.isConnectedWithProvider"
            @click="formData.post('/me/details')"
          >
            Mettre à jour
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Vous ne pouvez pas modifier vos informations car vous êtes connecter avec un service
            tiers
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </MeLayout>
</template>
