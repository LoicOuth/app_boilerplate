<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <Head :title="t('home')" />

  <h1 class="text-center text-5xl font-semibold mt-12 leading-relaxed">
    Bienvenue <span class="text-primary font-bold">l'application</span> qui permet de faire quelque
    chose d'exeptionnel
  </h1>

  <div class="flex justify-center gap-3 items-center mt-5">
    <Button>Voir ici</Button>
    <Button variant="outline">Voir La</Button>
  </div>

  <Button @click="router.post('/notifications')">Send notif</Button>
</template>
