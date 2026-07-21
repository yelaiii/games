import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@siberiacancode/reactuse'

import { chipVariants } from './chip-variants'

export type ChipProps = ComponentProps<'div'> &
  VariantProps<typeof chipVariants> & {
    disabled?: boolean
  }

export function Chip({
  className,
  children,
  disabled,
  isSelected,
  size,
  variant,
  ...props
}: ChipProps) {
  return (
    <div
      {...props}
      aria-disabled={disabled}
      className={cn(chipVariants({ isSelected, size, variant }), className)}
    >
      {children}
    </div>
  )
}
