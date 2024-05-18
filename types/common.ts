import { Theme } from '#types/theme'

export interface SharedPageProps extends Record<string, any> {
  theme: Theme
}

export interface SvgProps {
  height?: number
  width?: number
  class?: string
}
