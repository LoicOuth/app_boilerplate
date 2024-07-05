<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost" size="icon" class="relative">
        <BellIcon> </BellIcon>
        <div class="absolute h-5 w-5 bg-red-500 text rounded-full top-0 right-0 text-white">9</div>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="min-w-52 p-5"> Aucune notifications </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { BellIcon } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../shared/ui/dropdown-menu'
import { Button } from '../shared/ui/button'
import { Transmit } from '@adonisjs/transmit-client'
import { useUser } from '~/composables/use_user'
import { onMounted } from 'vue'
import { toast } from 'vue-sonner'

const { user } = useUser()

onMounted(async () => {
  const transmit = new Transmit({
    baseUrl: 'http://localhost:3333',
  })
  const subscription = transmit.subscription(`users/${user.value?.id}`)

  await subscription.create()

  subscription.onMessage((message: any) => {
    toast(message.title, {
      description: message.content,
      closeButton: true,
      id: message.id,
      duration: 3000,
      icon: BellIcon,
    })
  })
})
</script>
