import type { VariantProps } from 'class-variance-authority'

import { Button as ButtonPrimitive } from '@base-ui/react'

import { bcn } from '../utils'
import { buttonVariants } from './button-variants'

export type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>

export function Button({ children, className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive {...props} className={bcn(buttonVariants({ variant, size }), className)}>
      {children}
    </ButtonPrimitive>
  )
}
