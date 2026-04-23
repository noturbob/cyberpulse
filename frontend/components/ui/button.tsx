import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyber-500 active:scale-95 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-cyber-500 to-blue-600 text-white hover:shadow-glow-cyber active:shadow-glow-cyber-sm border-cyber-400/30",
        outline: "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 hover:shadow-glow-cyber-sm",
        secondary: "border-white/10 bg-white/5 text-white/90 hover:bg-white/10 hover:text-white hover:border-white/20",
        ghost: "border-transparent text-white/80 hover:text-white hover:bg-white/5",
        destructive: "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 hover:shadow-glow-critical hover:border-red-500/50",
        link: "text-cyber-400 underline-offset-4 hover:underline border-transparent",
      },
      size: {
        default: "h-10 gap-2 px-4",
        xs: "h-8 gap-1 rounded-md px-2 text-xs",
        sm: "h-9 gap-1.5 px-3 text-sm",
        lg: "h-12 gap-2 px-6 text-base",
        icon: "size-10",
        "icon-xs": "size-8 rounded-md",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
