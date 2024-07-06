<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" size="icon" class="relative">
        <BellIcon> </BellIcon>
        <div class="absolute h-5 w-5 bg-red-500 text rounded-full top-0 right-0 text-white">
          {{ unreadNotifications }}
        </div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-52">
      <div v-if="notifications.length" class="flex flex-col">
        <template v-for="notif in notifications">
          <div>{{ notif.value.title }}</div>
        </template>
      </div>
      <div v-else class="p-5">Aucune notifications</div>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { BellIcon } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Transmit } from '@adonisjs/transmit-client'
import { useUser } from '~/composables/use_user'
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue-sonner'
import Notification from '#models/notification'

const { user } = useUser()

const notifications = ref<Notification[]>([])

const unreadNotifications = computed(
  () => notifications.value.filter((notif) => !notif.readAt).length
)

onMounted(async () => {
  const transmit = new Transmit({
    baseUrl: 'http://localhost:3333',
  })
  const subscription = transmit.subscription(`users/${user.value?.id}/notifications`)

  await subscription.create()

  subscription.onMessage((message: any) => {
    if (message.notifications) {
      notifications.value = user.value ? [...message.notifications] : []
    } else {
      notifications.value.push({
        ...message.notification,
        readAt: null,
      })

      toast(message.notification.value.title, {
        description: message.notification.value.content,
        id: message.notification.id,
        duration: 3000,
        icon: BellIcon,
      })
    }
  })
})
</script>
