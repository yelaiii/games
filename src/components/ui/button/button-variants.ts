// @unocss-include
import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'duration-fast text-[14px] tracking-[0.005em] font-medium rounded-full cursor-pointer transition-colors disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary:
          'text-primary-foreground bg-primary disabled:bg-primary hover:bg-primary-hover disabled:opacity-20',
        secondary:
          'text-secondary-foreground bg-secondary disabled:bg-secondary hover:bg-secondary-hover disabled:opacity-70',
      },
      size: {
        lg: 'px-[24px] py-[12px] h-[52px]',
        md: 'px-[24px] py-[8px] h-[40px]',
        sm: 'px-[12px] py-[4px] h-[32px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)
