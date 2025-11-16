import { cva, type VariantProps } from 'class-variance-authority'

export { default as Tabs } from './Tabs.vue'
export { default as TabsContent } from './TabsContent.vue'
export { default as TabsList } from './TabsList.vue'
export { default as TabsTrigger } from './TabsTrigger.vue'

export const tabsTriggerVariants = cva(
  "inline-flex h-full cursor-pointer flex-1 items-center rounded text-sm whitespace-nowrap shadow-inner transition-[color,box-shadow] disabled:pointer-events-none hover:bg-white/5 transition-colors hover:text-white disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'data-[state=active]:bg-switch-checked py-1 text-switch-foreground data-[state=active]:text-switch-checked-foreground justify-center',
        vertical:
          'data-[state=active]:bg-switch-checked text-switch-foreground py-[6px] px-[10px] data-[state=active]:text-switch-checked-foreground justify-start',
        preview:
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-base font-medium text-[#aaaaaa] ring-offset-background transition-all hover:bg-white/10 hover:text-[#f2f2f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white/20 data-[state=active]:text-[#f2f2f2] data-[state=active]:shadow-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>
