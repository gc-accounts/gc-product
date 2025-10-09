'use client'

import { toast as sonnerToast } from "sonner"

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default'

interface ToastOptions {
  title?: string
  description?: string
  type?: ToastType
  duration?: number
}

/**
 * Reusable toast hook wrapping Sonner’s toast.
 */
export function useToast() {
  const toast = ({ title, description, type = 'default', duration = 3000 }: ToastOptions) => {
    switch (type) {
      case 'success':
        sonnerToast.success(title ?? 'Success', { description, duration })
        break
      case 'error':
        sonnerToast.error(title ?? 'Error', { description, duration })
        break
      case 'info':
        sonnerToast.info(title ?? 'Info', { description, duration })
        break
      case 'warning':
        sonnerToast.warning(title ?? 'Warning', { description, duration })
        break
      default:
        sonnerToast(title ?? '', { description, duration })
        break
    }
  }

  return { toast }
}

// Optional: direct one-liner usage
export const toast = (options: ToastOptions) => {
  const { title, description, type = 'default', duration } = options
  switch (type) {
    case 'success':
      sonnerToast.success(title ?? 'Success', { description, duration })
      break
    case 'error':
      sonnerToast.error(title ?? 'Error', { description, duration })
      break
    case 'info':
      sonnerToast.info(title ?? 'Info', { description, duration })
      break
    case 'warning':
      sonnerToast.warning(title ?? 'Warning', { description, duration })
      break
    default:
      sonnerToast(title ?? '', { description, duration })
      break
  }
}
