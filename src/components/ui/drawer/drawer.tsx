import type { ComponentProps } from 'react'

import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer'
import { cn } from '@siberiacancode/reactuse'
import { createContext, use, useMemo } from 'react'

import { Typography } from '../typography'

interface DrawerContextValue {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props['modal']
  swipeDirection: NonNullable<DrawerPrimitive.Root.Props['swipeDirection']>
}

const DrawerContext = createContext<DrawerContextValue>(null!)

export type DrawerProps = DrawerPrimitive.Root.Props

export function Drawer({
  modal = true,
  snapPoints,
  swipeDirection = 'down',
  ...props
}: DrawerProps) {
  const hasSnapPoints = snapPoints !== null && !!snapPoints?.length
  const contextValue = useMemo(
    () => ({ hasSnapPoints, modal, swipeDirection }),
    [hasSnapPoints, modal, swipeDirection],
  )

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={swipeDirection}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

export type DrawerTriggerProps = DrawerPrimitive.Trigger.Props

export function DrawerTrigger({ ...props }: DrawerTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

export type DrawerPortalProps = DrawerPrimitive.Portal.Props

export function DrawerPortal({ ...props }: DrawerPortalProps) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

export type DrawerCloseProps = DrawerPrimitive.Close.Props

export function DrawerClose({ ...props }: DrawerCloseProps) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

export type DrawerOverlayProps = Omit<DrawerPrimitive.Backdrop.Props, 'className'> & {
  className?: string
}

export function DrawerOverlay({ className, ...props }: DrawerOverlayProps) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        'supports-backdrop-filter:backdrop-blur-sm bg-black/30 opacity-[max(var(--drawer-overlay-min-opacity,0),calc(1-var(--drawer-swipe-progress)))] select-none transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] inset-0 fixed z-50 min-h-dvh data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 data-[ending-style]:pointer-events-none data-[ending-style]:[transition-duration:calc(var(--drawer-swipe-strength)*400ms)] data-[snap-points]:[--drawer-overlay-min-opacity:0.5] data-[swiping]:[transition-duration:0ms] supports-[-webkit-touch-callout:none]:absolute',
        className,
      )}
      {...props}
    />
  )
}

export type DrawerContentProps = Omit<DrawerPrimitive.Popup.Props, 'className'> & {
  className?: string
}

export function DrawerContent({ className, children, ...props }: DrawerContentProps) {
  const { hasSnapPoints, modal, swipeDirection } = use(DrawerContext)
  const swipeAxis = swipeDirection === 'down' || swipeDirection === 'up' ? 'y' : 'x'

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal === true && <DrawerOverlay data-snap-points={hasSnapPoints ? '' : undefined} />}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        className="pointer-events-none select-none inset-0 fixed z-50 data-[modal=true]:pointer-events-auto"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis}
          data-swipe-direction={swipeDirection}
          data-snap-points={hasSnapPoints ? '' : undefined}
          className={cn(
            // Base.
            'group/drawer-popup text-foreground m-[var(--drawer-inset,0px)] outline-none will-change-transform bg-background flex flex-col h-[var(--drawer-content-height)] max-h-[var(--drawer-content-max-height,none)] min-h-0 w-[var(--drawer-content-width,auto)] pointer-events-auto select-none shadow-xl transition-[transform,height,opacity,filter] duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] [--drawer-bleed-background:transparent] [--drawer-inset:0px] [--drawer-stacked-shadow:0_-20px_25px_-5px_rgb(0_0_0/0.1),0_-8px_10px_-6px_rgb(0_0_0/0.1)] [interpolate-size:allow-keywords] [transform:translate3d(var(--translate-x,0px),var(--translate-y,0px),0)_scale(var(--stack-scale))] fixed z-50 data-[swipe-direction=down]:data-[nested-drawer-open]:shadow-[var(--drawer-stacked-shadow)]',
            // Nested.
            'data-[nested-drawer-open]:overflow-hidden data-[nested-drawer-open]:brightness-95',
            // Bleed.
            'after:bg-transparent after:pointer-events-none after:absolute data-[swipe-axis=x]:after:w-[var(--bleed)] data-[swipe-axis=y]:after:h-[var(--bleed)] data-[swipe-axis=x]:after:inset-y-0 data-[swipe-axis=y]:after:inset-x-0 data-[swipe-direction=down]:after:top-full data-[swipe-direction=left]:after:right-full data-[swipe-direction=right]:after:left-full data-[swipe-direction=up]:after:bottom-full',
            // Sizing.
            '[--drawer-content-height:var(--drawer-height,auto)] data-[swipe-axis=x]:[--drawer-content-width:75%] data-[swipe-axis=y]:[--drawer-content-max-height:calc(100dvh-6rem)] data-[swipe-axis=x]:sm:[--drawer-content-width:24rem] data-[swipe-axis=y]:data-[snap-points]:[--drawer-content-height:100dvh]',
            // Stack.
            '[--bleed:3rem] [--peek:1rem] [--stack-height:var(--drawer-frontmost-height,var(--drawer-height,0px))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-scale-base:max(0,calc(1-(var(--nested-drawers)*var(--stack-step))))] [--stack-scale:clamp(0,calc(var(--stack-scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--stack-shrink:calc(1-var(--stack-scale))] [--stack-step:0.05]',
            // Transitions.
            'data-[ending-style]:opacity-[0.9999] data-[ending-style]:[transform:var(--closed-transform)] data-[ending-style]:[transition-duration:calc(var(--drawer-swipe-strength)*400ms)] data-[nested-drawer-swiping]:[transition-duration:0ms] data-[starting-style]:[transform:var(--closed-transform)] data-[swiping]:[transition-duration:0ms] data-[ending-style]:data-[nested-drawer-swiping]:[transition-duration:calc(var(--drawer-swipe-strength)*400ms)] data-[ending-style]:data-[swiping]:[transition-duration:calc(var(--drawer-swipe-strength)*400ms)]',
            // Axis: y.
            'data-[swipe-axis=y]:inset-x-0 data-[swipe-axis=y]:data-[nested-drawer-open]:h-[var(--stack-height)]',
            // Axis: x.
            'data-[swipe-axis=x]:flex-row data-[swipe-axis=x]:inset-y-0',
            // Direction: down.
            'data-[swipe-direction=down]:rounded-tl-[16px] data-[swipe-direction=down]:rounded-tr-[16px] data-[swipe-direction=down]:origin-bottom data-[swipe-direction=down]:[--closed-transform:translate3d(0,calc(100%+var(--drawer-inset,0px)+2px),0)_scale(var(--stack-scale))] data-[swipe-direction=down]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--stack-shrink)*var(--stack-height)))] data-[swipe-direction=down]:bottom-0',
            // Direction: up.
            'data-[swipe-direction=up]:origin-top data-[swipe-direction=up]:[--closed-transform:translate3d(0,calc(-100%-var(--drawer-inset,0px)-2px),0)_scale(var(--stack-scale))] data-[swipe-direction=up]:[--translate-y:calc(var(--drawer-snap-point-offset,0px)+var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--stack-shrink)*var(--stack-height)))] data-[swipe-direction=up]:top-0',
            // Direction: left.
            'data-[swipe-direction=left]:origin-left data-[swipe-direction=left]:[--closed-transform:translate3d(calc(-100%-var(--drawer-inset,0px)-2px),0,0)_scale(var(--stack-scale))] data-[swipe-direction=left]:[--translate-x:calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)+(var(--stack-shrink)*100%))] data-[swipe-direction=left]:left-0',
            // Direction: right.
            'data-[swipe-direction=right]:origin-right data-[swipe-direction=right]:[--closed-transform:translate3d(calc(100%+var(--drawer-inset,0px)+2px),0,0)_scale(var(--stack-scale))] data-[swipe-direction=right]:[--translate-x:calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)-(var(--stack-shrink)*100%))] data-[swipe-direction=right]:right-0 md:data-[swipe-direction=right]:m-[12px] md:data-[swipe-direction=right]:rounded-[24px]',
            className,
          )}
          {...props}
        >
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            className={cn(
              'p-[16px] overscroll-contain rounded-[inherit] flex flex-1 flex-col min-h-0 select-text transition-opacity duration-300 ease-[cubic-bezier(0.45,1.005,0,1.005)] overflow-hidden md:p-[24px] group-data-[nested-drawer-open]/drawer-popup:opacity-0 group-data-[nested-drawer-swiping]/drawer-popup:opacity-100 group-data-[swiping]/drawer-popup:select-none',
            )}
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

export type DrawerHeaderProps = ComponentProps<'div'>

export function DrawerHeader({ className, ...props }: DrawerHeaderProps) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        'p-4 pb-0 flex shrink-0 flex-col gap-0.5 group-data-[swipe-axis=y]/drawer-popup:text-center md:text-left md:gap-1.5',
        className,
      )}
      {...props}
    />
  )
}

export type DrawerFooterProps = ComponentProps<'div'>

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return <div data-slot="drawer-footer" className={className} {...props} />
}

export type DrawerTitleProps = Omit<DrawerPrimitive.Title.Props, 'className'> & {
  className?: string
}

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      render={(props) => <Typography tag="h2" variant="title-md" {...props} />}
      className={className}
      {...props}
    />
  )
}

export type DrawerDescriptionProps = Omit<DrawerPrimitive.Description.Props, 'className'> & {
  className?: string
}

export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  return (
    <DrawerPrimitive.Description data-slot="drawer-description" className={className} {...props} />
  )
}
