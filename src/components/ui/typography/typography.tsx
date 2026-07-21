import type { VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@siberiacancode/reactuse'

import { typographyVariants } from './typography-variants'

export type TypographyTag = 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type TypographyProps<Tag extends TypographyTag = 'div'> = { tag?: Tag } & VariantProps<
  typeof typographyVariants
> &
  Omit<ComponentPropsWithoutRef<Tag>, 'tag' | 'variant'>

export function Typography<Tag extends TypographyTag = 'div'>({
  className,
  tag,
  variant,
  ...props
}: TypographyProps<Tag>) {
  const Component = tag ?? 'div'

  return <Component {...props} className={cn(typographyVariants({ variant }), className)} />
}
