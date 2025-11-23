<script lang="ts">
  import { reactiveOmit } from "@vueuse/core";
  import { useForwardProps } from "reka-ui";
  import type { NuxtLinkProps } from "#app/components";
  import type { HtmlHTMLAttributes } from "vue";

  /**
   * Exported button styles that can be used by other components
   */
  export const buttonStyles = tv({
    base: "group focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-xl text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] active:scale-98 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary/90 text-black",
        login: "text-bold bg-[#141414] text-white hover:bg-[#252525]",
        alternative: "h-10 bg-black text-[#f2f2f2] shadow hover:bg-[#131313]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/60 focus-visible:ring-destructive/40",
        outline:
          "hover:text-accent-foreground border border-white/10 bg-transparent hover:border-white/15 hover:bg-white/5",
        secondary: "bg-background/80 hover:bg-background border border-white/10",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        profile: "p-2 hover:bg-white/5 active:scale-100",
        nav_link: "text-neutral-400 hover:bg-white/5 hover:text-white",
        nav_link_disabled:
          "text-neutral-600 hover:bg-transparent hover:text-neutral-600 active:scale-100",
        nav_link_active: "bg-white/10 text-white",
      },
      effect: {
        expandIcon: "group relative gap-0",
        ringHover: "hover:ring-ring/50 transition-all duration-300 hover:ring-3",
        shine:
          "before:animate-shine relative overflow-hidden [background-position:0s_ease] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-no-repeat",
        shineHover:
          "relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0]",
        gooeyRight:
          "relative z-0 overflow-hidden duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r before:from-white/40 before:transition-transform before:duration-1000 hover:before:translate-x-[0%] hover:before:translate-y-[0%]",
        gooeyLeft:
          "relative z-0 overflow-hidden duration-500 after:absolute after:inset-0 after:-z-10 after:translate-x-[-150%] after:translate-y-[150%] after:scale-[2.5] after:rounded-[100%] after:bg-gradient-to-l after:from-white/40 after:transition-transform after:duration-1000 hover:after:translate-x-[0%] hover:after:translate-y-[0%]",
        underline:
          "after:bg-primary relative !no-underline after:absolute after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-left after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-right hover:after:scale-x-0",
        hoverUnderline:
          "after:bg-primary relative !no-underline after:absolute after:bottom-2 after:h-[1px] after:w-2/3 after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100",
        gradientSlideShow:
          "animate-gradient-flow bg-[linear-gradient(-45deg,var(--gradient-lime),var(--gradient-ocean),var(--gradient-wine),var(--gradient-rust))] bg-[size:400%] text-white",
      },
      size: {
        xs: "h-7 gap-1 px-2.5 text-xs has-[>svg]:px-2",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        default: "h-9 px-4 py-2 has-[>svg]:pr-2.5 has-[>svg]:pl-3",
        lg: "h-10 px-6 has-[>svg]:px-4",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        icon: "size-9",
        "icon-lg": "size-10",
      },
      disabled: {
        true: "pointer-events-none opacity-50",
      },
      hasIcon: {
        false: "gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  });
  export type ButtonVariants = VariantProps<typeof buttonStyles>;
  export type ButtonProps = NuxtLinkProps & {
    /** The type for the button */
    type?: "button" | "submit" | "reset";
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Whether the button is loading */
    loading?: boolean;
    /** The action to perform when the button is clicked */
    onClick?: any;
    /** The element to render the button as */
    as?: string;
    /** Custom class(es) to add to parent element */
    class?: HtmlHTMLAttributes["class"];
    /** The variant of the button */
    variant?: ButtonVariants["variant"];
    /** The size of the button */
    size?: ButtonVariants["size"];
    /**
     * The effect to apply to the button.
     */
    effect?: ButtonVariants["effect"];
    /** The text to display in the button */
    text?: string;
    /** Should the icon be displayed on the `left` or the `right`? */
    iconPlacement?: "left" | "right";
    /** The icon to display in the button */
    icon?: string;
    /** The icon to display when the button is loading */
    loadingIcon?: string;
  };
</script>

<script setup lang="ts">
  const props = withDefaults(defineProps<ButtonProps>(), {
    type: "button",
    loadingIcon: "line-md:loading-loop",
    iconPlacement: "left",
    loading: false,
  });

  const elementType = computed(() => {
    if (props.as) return props.as;
    if (props.href || props.to || props.target) return resolveComponent("NuxtLink");
    return "button";
  });

  const forwarded = useForwardProps(
    reactiveOmit(
      props,
      "class",
      "text",
      "icon",
      "iconPlacement",
      "size",
      "variant",
      "as",
      "loading",
      "disabled",
      "loadingIcon",
      "effect"
    )
  );
</script>

<template>
  <component
    :is="elementType"
    :class="
      buttonStyles({
        hasIcon: !!icon,
        disabled: disabled || loading,
        variant: variant,
        size: size,
        class: props.class,
        effect: props.effect,
      })
    "
    :disabled="disabled || loading"
    v-bind="forwarded"
  >
    <slot name="iconLeft">
      <div
        v-if="icon && iconPlacement == 'left'"
        class="flex w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-[0%] group-hover:pr-2 group-hover:opacity-100"
      >
        <Icon :name="icon" class="size-4" />
      </div>
    </slot>
    <slot name="loading">
      <Icon v-if="loading" class="size-4 shrink-0" :name="loadingIcon" />
    </slot>
    <slot>
      <span v-if="text">{{ text }}</span>
    </slot>
    <slot name="iconRight">
      <div
        v-if="icon && iconPlacement == 'right'"
        class="flex w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100"
      >
        <Icon :name="icon" class="size-4" />
      </div>
    </slot>
  </component>
</template>
