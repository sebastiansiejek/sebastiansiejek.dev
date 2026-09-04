import { PropsWithChildren } from 'react'
import { PortfolioHeader } from 'features/portfolio/PortfolioHeader'
import { SiteFooter } from 'features/portfolio/SiteFooter'
import { PortfolioShell } from 'features/portfolio/PortfolioShell'

export default function BlogLayout({ children }: PropsWithChildren) {
  return (
    <PortfolioShell lang="pl">
      <PortfolioHeader locale="pl" alternateHref="/en" />
      <main className="min-h-[calc(100dvh-188px)] py-12">{children}</main>
      <SiteFooter locale="pl" />
    </PortfolioShell>
  )
}
