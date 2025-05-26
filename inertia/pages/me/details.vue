<script setup lang="ts">
import { PenIcon } from 'lucide-vue-next'
import UserAvatar from '~/components/shared/user/UserAvatar.vue'
import MeLayout from '~/layouts/Me.layout.vue'

const { t } = useI18n()
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
  setBreadCrumb([{ route: 'me.details.render', label: t('profileDetails.title') }])
})
</script>

<template>
  <Head :title="t('profileDetails.head')" />

  <MeLayout>
    <div>
      <h3 class="text-lg font-medium">{{ t('profileDetails.title') }}</h3>
      <p class="text-sm text-muted-foreground">
        {{ t('profileDetails.description') }}
      </p>
    </div>
    <Separator />

    <Avatar v-if="avatarFileInputSrc" size="lg" class="relative">
      <AvatarImage :src="avatarFileInputSrc" />
    </Avatar>
    <UserAvatar v-else :user="user" size="lg" class="group">
      <div
        v-if="!user?.isConnectedWithProvider"
        class="group-hover:flex absolute top-0 h-full w-full rounded-full bg-opacity-50 bg-black z-10 justify-center hidden items-center cursor-pointer"
        @click="avatarFileInput.click()"
      >
        <PenIcon color="white" />
      </div>
    </UserAvatar>
    <input
      ref="avatarFileInput"
      class="hidden"
      type="file"
      @input="formData.avatar = ($event.target as HTMLInputElement).files?.[0] || null"
    />

    <div class="flex flex-col gap-2">
      <Label for="name">{{ t('profileDetails.name') }}</Label>
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
      <Label for="email">{{ t('profileDetails.email') }}</Label>
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
            {{ t('profileDetails.update') }}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {{ t('profileDetails.cantEdit') }}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <template v-if="user?.validatedAt">
      <Separator />

      <p class="text-muted-foreground">
        {{ t('meLayout.validateAccount') }}
        <strong>{{ new Date(user.validatedAt).toLocaleString() }}</strong>
      </p>
    </template>
  </MeLayout>
</template>
