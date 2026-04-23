import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-lg border border-white/20 glass-card bg-white/5 px-3 py-2 text-base text-white placeholder:text-white/40 transition-all outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground hover:border-white/30 hover:bg-white/10 focus-visible:border-cyber-500 focus-visible:ring-2 focus-visible:ring-cyber-500/20 focus-visible:bg-white/10 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
