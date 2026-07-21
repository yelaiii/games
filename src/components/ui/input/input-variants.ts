// @unocss-include
import { cva } from 'class-variance-authority'

export const inputVariants = cva(
  'text-primary px-[16px] outline-[3px] outline-transparent border border-input rounded-full bg-primary-foreground shadow-[0_1px_2px_#0000000D] transition-[border-color,outline-color] placeholder:text-input focus:outline-ring focus:border-border-soft data-[invalid=true]:focus:outline-ring-error data-[invalid=true]:border-destructive-border!',
  {
    variants: {
      size: {
        lg: 'text-[24px] py-[14px] h-[52px]',
        md: 'text-[20px] py-[8px] h-[40px]',
        sm: 'text-[18px] py-[4px] h-[32px]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)
