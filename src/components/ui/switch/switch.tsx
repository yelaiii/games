import { Switch as SwitchPrimitive } from '@base-ui/react'
import { cn } from '@siberiacancode/reactuse'

import { bcn } from '../utils'

export type SwitchProps = SwitchPrimitive.Root.Props

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      {...props}
      className={bcn(
        'group p-[1px] outline-[3px] outline-transparent rounded-full bg-surface h-[26px] w-[48px] block shadow-[0_1px_2px_#0000000D] transition-[outline-color,background-color] focus:outline-ring data-[checked]:bg-primary data-[disabled]:opacity-30',
        className,
      )}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          'rounded-full bg-surface-foreground size-[24px] block transition-[transform,background-color] data-[checked]:bg-primary-foreground data-[checked]:translate-x-[22px]',
        )}
      />
    </SwitchPrimitive.Root>
  )
}
