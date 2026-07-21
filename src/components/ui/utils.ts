import { cn } from '@siberiacancode/reactuse'

type ClassValue = Parameters<typeof cn>[number]

export function rcn<State>(
  state: State,
  className: ClassValue | ((state: State) => ClassValue),
  ...inputs: ClassValue[]
) {
  return cn(...inputs, typeof className === 'function' ? className(state) : className)
}
