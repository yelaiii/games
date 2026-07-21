import type { VariantProps } from 'class-variance-authority'

import { Input as InputPrimitive } from '@base-ui/react'

import { bcn } from '../utils'
import { inputVariants } from './input-variants'

export type InputProps = Omit<InputPrimitive.Props, 'size'> & VariantProps<typeof inputVariants>

export function Input({ className, size, ...props }: InputProps) {
  return <InputPrimitive {...props} className={bcn(inputVariants({ size }), className)} />
}
