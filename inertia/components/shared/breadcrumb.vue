<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '~/components/shared/ui/breadcrumb'
import { Link } from '@inertiajs/vue3'
import { useProfileBreadcrumb } from '~/composables/use_breadcrumb'

const { breadcrumbProfileItems } = useProfileBreadcrumb()
</script>

<template>
  <Breadcrumb class="mt-3">
    <BreadcrumbList>
      <template v-for="(item, index) in breadcrumbProfileItems" :key="index">
        <BreadcrumbItem>
          <BreadcrumbLink v-if="index !== breadcrumbProfileItems.length - 1" as-child>
            <Link as="a" :href="item.href" class="cursor-pointer">
              {{ item.label }}
            </Link>
          </BreadcrumbLink>
          <BreadcrumbPage v-else>{{ item.label }}</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index !== breadcrumbProfileItems.length - 1" />
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
