import * as React from "react"
import { cn } from "cn"

function Card({
  className,
  interactive = false,
  size = "default",
  variant = "default",
  ...properties
}: React.ComponentProps<"div"> & {
  interactive?: boolean
  size?: "default" | "sm"
  variant?: "default" | "accent"
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(6)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        variant === "accent" && "accent-wash",
        interactive &&
          "transition-transform duration-200 group-hover/link:-translate-y-1 group-focus-visible/link:ring-3 group-focus-visible/link:ring-ring/50",
        className
      )}
      {...properties}
    />
  )
}

function CardHeader({ className, ...properties }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...properties}
    />
  )
}

function CardTitle({ className, ...properties }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-xl leading-snug font-semibold tracking-tight group-data-[size=sm]/card:text-base md:text-2xl",
        className
      )}
      {...properties}
    />
  )
}

function CardDescription({ className, ...properties }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...properties}
    />
  )
}

function CardAction({ className, ...properties }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...properties}
    />
  )
}

function CardContent({ className, ...properties }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...properties}
    />
  )
}

function CardFooter({ className, ...properties }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...properties}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
