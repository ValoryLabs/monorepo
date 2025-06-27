import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  "inline-flex active:scale-98 cursor-pointer items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-black drop-shadow-[0_0_10px_#ffffff4f] hover:bg-primary/90',
        login: 'bg-[#141414] text-bold text-white hover:bg-[#252525]',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/60 focus-visible:ring-destructive/40',
        outline:
          'border border-white/10 bg-transparent hover:bg-white/5 hover:border-white/15 hover:text-accent-foreground',
        secondary: 'bg-background/80 border border-white/10 hover:bg-background',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        profile: 'hover:bg-white/5 active:scale-100 p-2',
        nav_link: 'text-neutral-400 hover:text-white hover:bg-white/5',
        nav_link_disabled:
          'active:scale-100 text-neutral-600 hover:text-neutral-600 hover:bg-transparent',
        nav_link_active: 'bg-white/10 text-white',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9 justify-center',
        nav_link: 'px-3 py-2 rounded-lg',
        none: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
