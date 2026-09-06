import { PropsWithChildren } from 'react'
import { SiteShell } from 'shared/ui/site-layout'
import { SiteFooter } from 'widgets/site-footer'
import { SiteHeader } from 'widgets/site-header'

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <SiteShell lang="pl">
      <SiteHeader locale="pl" alternateHref="/en" />
      <main className="flex-1 py-12">{children}</main>
      <SiteFooter locale="pl" />
    </SiteShell>
  )
}
