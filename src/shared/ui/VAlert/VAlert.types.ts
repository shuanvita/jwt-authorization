export type VAlertVariant = 'error' | 'success' | 'warning' | 'info'

export interface VAlertProps {
  /** Visual variant of the alert. */
  variant?: VAlertVariant
  /** Override the leading icon name (defaults to a per-variant icon). */
  icon?: string
  /** Show a close button. */
  closable?: boolean
  /** Render as a floating toast in a fixed corner of the viewport. */
  floating?: boolean
  /** Auto-dismiss timeout in ms. `0` disables auto-dismiss. */
  duration?: number
}

export interface VAlertEmits {
  (e: 'close'): void
}
