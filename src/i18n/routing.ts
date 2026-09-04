import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/projects/[slug]': {
      pl: '/projekty/[slug]',
      en: '/projects/[slug]',
    },
  },
})
