interface VButtonBaseProps {
  iconSize?: number
  variant?: 'default' | 'custom'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  ariaLabel?: string
}

interface VButtonIconOnlyProps {
  icon: string
  preIcon?: never
  postIcon?: never
}

interface VButtonWithSideIconsProps {
  icon?: never
  preIcon?: string
  postIcon?: string
}

export type VButtonProps =
  VButtonBaseProps & (VButtonIconOnlyProps | VButtonWithSideIconsProps)
