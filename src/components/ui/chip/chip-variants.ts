// @unocss-include
import { cva } from 'class-variance-authority'

export const chipVariants = cva(
  'text-primary tracking-[0.015em] font-bold rounded-full flex gap-x-[4px] w-fit items-center data-[disabled=true]:opacity-30 data-[disabled=true]:pointer-events-none',
  {
    variants: {
      variant: {
        default: '',
        special: '',
      },
      isSelected: {
        true: 'text-primary-foreground',
        false: 'bg-secondary-hover',
      },
      size: {
        md: 'text-[20px] px-[18px] py-[12px] h-[52px]',
        sm: 'text-[12px] px-[12px] py-[8px] h-[32px]',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        isSelected: true,
        class: 'bg-primary',
      },
      {
        variant: 'special',
        isSelected: true,
        class: 'bg-accent',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'md',
      isSelected: false,
    },
  },
)
