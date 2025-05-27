<script setup lang="ts">
import NavLink from '~/components/layouts/app.layout/NavLink.vue'
import UserMenu from '~/components/shared/menu/UserMenu.vue'
import Notification from '~/components/shared/Notification.vue'
import ThemeToggle from '~/components/shared/ThemeToggle.vue'
import MainLayout from '~/layouts/Main.layout.vue'
</script>

<template>
  <MainLayout>
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader class="h-14">
          <h1>Logo</h1>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavLink route="dashboard.index" icon="LayoutDashboard" text="Tableau de bord" />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter />
      </Sidebar>
      <div class="flex flex-col w-full">
        <header class="w-full bg-sidebar px-5 py-2 h-14 flex items-center justify-between border-b">
          <SidebarTrigger class="size-8" />
          <div class="flex items-center gap-2">
            <ThemeToggle />
            <Notification />
            <UserMenu :from-dashboard="true" />
          </div>
        </header>
        <main class="flex-1 p-5">
          <slot />
        </main>
      </div>
    </SidebarProvider>
  </MainLayout>
</template>
