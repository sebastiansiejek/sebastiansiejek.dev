'use client'

import Link from 'next/link'
import { Button } from 'shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'shared/ui/dropdown-menu'

type MobileNavigationProperties = {
  alternateHref: string
  alternateHrefLang: string
  alternateLocaleName: string
  label: string
  links: Array<{ href: string; label: string }>
}

export function MobileNavigation({
  alternateHref,
  alternateHrefLang,
  alternateLocaleName,
  label,
  links,
}: MobileNavigationProperties) {
  return (
    <div className="hidden max-md:block">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button size="lg" variant="outline" />}>
          {label}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72" sideOffset={12}>
          <DropdownMenuGroup>
            {links.map((link) => (
              <DropdownMenuItem key={link.href} render={<Link href={link.href} />}>
                {link.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              render={
                <Link href={alternateHref} hrefLang={alternateHrefLang} />
              }
            >
              {alternateLocaleName}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
