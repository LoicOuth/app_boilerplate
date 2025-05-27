import AppLayout from '~/layouts/App.layout.vue'
import AuthLayout from '~/layouts/Auth.layout.vue'
import MainLayout from '~/layouts/Main.layout.vue'
import PublicLayout from '~/layouts/Public.layout.vue'

export const getCurrentLayout = (page: string) => {
  let layout = AppLayout

  if (page.includes('Login') || page.includes('Register')) {
    layout = AuthLayout
  } else if ((page.includes('public') && !page.includes('auth')) || page.includes('me')) {
    layout = PublicLayout
  } else if (page.includes('auth')) {
    layout = MainLayout
  }

  return layout
}
