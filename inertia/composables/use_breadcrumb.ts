import { BreadcrumbItem } from '#types/common'
import { ref } from 'vue'

const firstBreadcrumbProfileItem: BreadcrumbItem = {
  href: '/me/details',
  label: 'Paramétrage du compte',
}
const breadcrumbProfileItems = ref<BreadcrumbItem[]>([])

export const useProfileBreadcrumb = () => {
  const setBreadCrumb = (breadCrumbItems: BreadcrumbItem[]) => {
    breadcrumbProfileItems.value = [firstBreadcrumbProfileItem, ...breadCrumbItems]
  }

  return {
    breadcrumbProfileItems,
    setBreadCrumb,
  }
}
