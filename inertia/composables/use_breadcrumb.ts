import { BreadcrumbItem } from '#types/common'
import { ref } from 'vue'

const firstsBreadcrumbProfileItem: BreadcrumbItem[] = [
  {
    href: '/',
    label: 'Accueil',
  },
  {
    href: '/me/details',
    label: 'Paramétrage du compte',
  },
]
const breadcrumbProfileItems = ref<BreadcrumbItem[]>([])

export const useProfileBreadcrumb = () => {
  const setBreadCrumb = (breadCrumbItems: BreadcrumbItem[]) => {
    breadcrumbProfileItems.value = [...firstsBreadcrumbProfileItem, ...breadCrumbItems]
  }

  return {
    breadcrumbProfileItems,
    setBreadCrumb,
  }
}
