import { createFileRoute } from '@tanstack/react-router'

import { Button } from '#/components/ui/button'
import { Chip } from '#/components/ui/chip'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '#/components/ui/drawer'
import { InputGroup, InputGroupAddon } from '#/components/ui/input-group'
import { InputGroupInput } from '#/components/ui/input-group'
import { Switch } from '#/components/ui/switch'
import { Typography } from '#/components/ui/typography'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Typography>Hello world!</Typography>
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon>
          <div className="i-lucide:search" />
        </InputGroupAddon>
      </InputGroup>
      <Button>Button</Button>
      <Chip isSelected variant="special" size="md">
        50%
      </Chip>
      <Switch />
      <Drawer swipeDirection="right">
        <DrawerTrigger>Hello</DrawerTrigger>
        <DrawerContent>
          <DrawerTitle>Content</DrawerTitle>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
