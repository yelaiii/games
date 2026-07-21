import { cn } from '@siberiacancode/reactuse'

type ClassValue = Parameters<typeof cn>[number]
type ClassValueOrFn<State> = ClassValue | ((state: State) => ClassValue)

export function bcn<State = any>(...inputs: ClassValueOrFn<State>[]) {
  return (state: State) =>
    cn(...inputs.map((input) => (typeof input === 'function' ? input(state) : input)))
}
