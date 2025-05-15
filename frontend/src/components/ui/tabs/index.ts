import { cva, type VariantProps } from 'class-variance-authority'

export { default as Tabs } from './Tabs.vue'
export { default as TabsContent } from './TabsContent.vue'
export { default as TabsList } from './TabsList.vue'
export { default as TabsTrigger } from './TabsTrigger.vue'

export const tabsTriggerVariants = cva(
  "inline-flex h-full flex-1 items-center rounded text-sm whitespace-nowrap shadow-inner  transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'data-[state=active]:bg-switch-checked text-switch-foreground data-[state=active]:text-switch-checked-foreground justify-center drop-shadow-[0_0_10px_#ffffff4f]',
        vertical: 'data-[state=active]:bg-switch-checked text-switch-foreground py-[6px] px-[10px] data-[state=active]:text-switch-checked-foreground justify-start drop-shadow-[0_0_10px_#ffffff4f]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>
