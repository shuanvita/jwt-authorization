export type VModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'custom'

export interface VModalProps {
  /** Controlled open state. Use with `v-model:open`. */
  open: boolean
  /** Optional header title. Ignored if `header` slot is provided. */
  title?: string
  /** Close the modal when the backdrop is clicked. */
  closeOnBackdrop?: boolean
  /** Close the modal when the Escape key is pressed. */
  closeOnEsc?: boolean
  /** Hide the default close button in the header. */
  hideCloseButton?: boolean
  /** Lock body scroll while the modal is open. */
  lockScroll?: boolean
  /** Predefined width preset. Use `custom` to fully control via class. */
  size?: VModalSize
  /** Extra classes for the modal panel. */
  panelClass?: string
  /** Accessible label, used when `title` is not provided. */
  ariaLabel?: string
}

export interface VModalEmits {
  (e: 'update:open', value: boolean): void
  (e: 'close'): void
}
