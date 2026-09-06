import { PropsWithChildren } from 'react'
import { SiteShell } from 'shared/ui/portfolio-layout'
import { SiteFooter } from 'widgets/site-footer'
import { SiteHeader } from 'widgets/site-header'

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <SiteShell lang="pl">
      <SiteHeader locale="pl" alternateHref="/en" />
      <main className="min-h-[calc(100dvh-188px)] py-12">{children}</main>
      <SiteFooter locale="pl" />
    </SiteShell>
  )
}
