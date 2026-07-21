// @unocss-include
import { cva } from 'class-variance-authority'

export const typographyVariants = cva('text-primary font-sans', {
  variants: {
    variant: {
      'heading-2xl': 'text-[36px] leading-[44px] font-extrabold md:text-[96px] md:leading-[96px]',
      'heading-xl': 'text-[64px] leading-[64px] font-extrabold md:text-[80px] md:leading-[82px]',
      'heading-lg': 'text-[60px] leading-[68px] font-bold',
      'heading-md': 'text-[48px] leading-[48px] tracking-[-0.03em] font-bold',
      'title-lg': 'text-[32px] leading-[40px] font-bold',
      'title-md': 'text-[24px] leading-[32px] tracking-[0.005em] font-bold',
      'body-lg': 'text-[24px] leading-[32px] tracking-[0.005em] font-medium',
      'body-md': 'text-[18px] leading-[26px] tracking-[0.005em]',
      'body-sm': 'text-[16px] leading-[24px] tracking-[0.005em] font-medium',
      'link': 'text-[16px] leading-[24px] tracking-[0.005em] font-medium',
      'caption': 'text-[14px] leading-[22px] tracking-[0.005em] font-medium',
    },
  },
  defaultVariants: {
    variant: 'body-md',
  },
})
