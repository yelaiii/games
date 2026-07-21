import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { cn } from '@siberiacancode/reactuse'
import { cva } from 'class-variance-authority'
import { createContext, useContext } from 'react'

import type { InputProps } from '../input/input'

import { Input } from '../input/input'
import { bcn } from '../utils'

type InputGroupContextValue = {
  size?: InputProps['size']
}

const InputGroupContext = createContext<InputGroupContextValue | null>(null)

export type InputGroupProps = ComponentProps<'div'> & Pick<InputProps, 'size'>

const inputGroupVariants = cva(
  `group/input-group outline-[3px] outline-transparent border border-input rounded-full bg-primary-foreground flex min-w-0 w-full shadow-[0_1px_2px_#0000000D] transition-[border-color,outline-color] items-center relative has-[[data-slot=input-group-control]:focus]:outline-ring has-[[data-slot=input-group-control][aria-invalid=true]:focus]:outline-ring-error has-[[data-slot=input-group-control][data-invalid=true]:focus]:outline-ring-error has-[[data-slot=input-group-control]:focus]:border-border-soft has-disabled:bg-input/50 has-disabled:opacity-50 has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-start]]:h-auto has-[>textarea]:h-auto [&>[data-slot=input-group-control]]:has-[>[data-align=block-end]]:pt-3 [&>[data-slot=input-group-control]]:has-[>[data-align=block-start]]:pb-3 [&>[data-slot=input-group-control]]:has-[>[data-align=inline-end]]:pr-2 [&>[data-slot=input-group-control]]:has-[>[data-align=inline-start]]:pl-2 has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive-border! has-[[data-slot=input-group-control][data-invalid=true]]:border-destructive-border! in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0`,
  {
    variants: {
      size: {
        lg: 'text-[24px] h-[52px]',
        md: 'text-[20px] h-[40px]',
        sm: 'text-[18px] h-[32px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export function InputGroup({ className, size, ...props }: InputGroupProps) {
  return (
    <InputGroupContext.Provider value={{ size }}>
      <div
        {...props}
        data-slot="input-group"
        role="group"
        className={cn(inputGroupVariants({ size }), className)}
      />
    </InputGroupContext.Provider>
  )
}

const inputGroupAddonVariants = cva(
  "text-sm text-muted-foreground font-medium py-1.5 flex gap-2 h-auto cursor-text select-none items-center justify-center group-data-[disabled=true]/input-group:opacity-50 [&>svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        'inline-start': 'pl-4 order-first has-[>button]:ml-[-0.3rem]',
        'inline-end': 'pr-4 order-last has-[>button]:mr-[-0.3rem]',
        'block-start':
          '[.border-b]:pb-2 px-2.5 pt-2 w-full justify-start order-first group-has-[>[data-slot=input-group-control]]/input-group:pt-2',
        'block-end':
          '[.border-t]:pt-2 px-2.5 pb-2 w-full justify-start order-last group-has-[>[data-slot=input-group-control]]/input-group:pb-2',
      },
    },
    defaultVariants: {
      align: 'inline-start',
    },
  },
)

export type InputGroupAddonProps = ComponentProps<'div'> &
  VariantProps<typeof inputGroupAddonVariants>

export function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: InputGroupAddonProps) {
  return (
    <div
      {...props}
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) return
        e.currentTarget.parentElement?.querySelector('input')?.focus()
      }}
    />
  )
}

export function InputGroupInput({ className, ...props }: InputProps) {
  const context = useContext(InputGroupContext)

  const size = props.size ?? context?.size ?? 'md'

  return (
    <Input
      {...props}
      data-slot="input-group-control"
      size={size}
      className={bcn(
        'aria-invalid:ring-0 outline-none border-0 rounded-none bg-transparent flex-1 ring-0 shadow-none focus:outline-transparent focus:outline-none focus:border-transparent disabled:bg-transparent focus-visible:ring-0 data-[invalid=true]:focus:outline-transparent data-[invalid=true]:focus:outline-none data-[invalid=true]:border-transparent!',
        className,
      )}
    />
  )
}
