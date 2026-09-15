'use client'

import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from 'cn'
import {
  MobileThemeSwitcher,
  type ThemeSwitcherLabels,
} from 'features/theme-switcher'
import { Button } from 'shared/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'shared/ui/sheet'
import { Separator } from 'shared/ui/separator'

type MobileNavigationProperties = {
  alternateHref: string
  alternateHrefLang: string
  alternateLocaleName: string
  closeLabel: string
  label: string
  links: Array<{ href: string; label: string }>
  navigationLabel: string
  themeLabels: ThemeSwitcherLabels
}

export function MobileNavigation({
  alternateHref,
  alternateHrefLang,
  alternateLocaleName,
  closeLabel,
  label,
  links,
  navigationLabel,
  themeLabels,
}: MobileNavigationProperties) {
  const [open, setOpen] = useState(false)

  return (
    <div className="hidden max-md:block">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              aria-label={open ? closeLabel : label}
              size="icon-lg"
              variant="outline"
            />
          }
        >
          <span className="relative grid size-5 place-items-center" aria-hidden="true">
            <MenuIcon
              className={cn(
                'absolute transition-[opacity,transform] duration-200',
                open && 'rotate-90 scale-0 opacity-0',
              )}
              data-icon="inline-start"
            />
            <XIcon
              className={cn(
                'absolute -rotate-90 scale-0 opacity-0 transition-[opacity,transform] duration-200',
                open && 'rotate-0 scale-100 opacity-100',
              )}
              data-icon="inline-start"
            />
          </span>
        </SheetTrigger>

        <SheetContent
          className="gap-0 rounded-r-3xl data-[side=left]:top-16 data-[side=left]:h-[calc(100dvh-4rem)] data-[side=left]:w-[80vw] data-[side=left]:sm:max-w-none"
          overlayClassName="top-16"
          showCloseButton={false}
          side="left"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{label}</SheetTitle>
          </SheetHeader>

          <nav
            aria-label={navigationLabel}
            className="flex min-h-0 flex-1 flex-col px-4 py-5"
          >
            <div className="flex flex-col gap-0.5">
              {links.map((link) => (
              <SheetClose
                key={link.href}
                nativeButton={false}
                render={
                  <Link
                    className="flex min-h-12 items-center rounded-lg text-base font-medium tracking-tight text-foreground no-underline transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    href={link.href}
                  />
                }
              >
                {link.label}
              </SheetClose>
            ))}
            </div>

            <div className="mt-auto flex flex-col gap-4 pt-5">
              <Separator />
              <MobileThemeSwitcher labels={themeLabels} />
              <SheetClose
              nativeButton={false}
              render={
                  <Link
                    className="flex min-h-11 items-center rounded-lg text-sm font-semibold text-foreground no-underline transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                    href={alternateHref}
                    hrefLang={alternateHrefLang}
                  />
              }
            >
                <span>{alternateLocaleName}</span>
              </SheetClose>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
