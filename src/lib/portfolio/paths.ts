import type { Locale } from 'next-intl'
import { getPathname } from 'i18n/navigation'
import type { ProjectKey } from './projects'

export function getProjectPath(locale: Locale, projectKey: ProjectKey) {
  return getPathname({
    locale,
    href: {
      pathname: '/projects/[slug]',
      params: { slug: projectKey },
    },
  })
}
