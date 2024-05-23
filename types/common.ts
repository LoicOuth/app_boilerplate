import User from '#models/user'
import { Theme } from '#types/theme'

export interface SharedPageProps extends Record<string, any> {
  user?: User
  theme: Theme
  authError?: boolean
}

export interface SvgProps {
  height?: number
  width?: number
  class?: string
}
