import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://sebastiansiejek.dev'),
  title: {
    default: 'Sebastian Siejek | Software Engineer',
    template: '%s | Sebastian Siejek',
  },
  description:
    'Software Engineer tworzący aplikacje webowe, automatyzacje i sklepy internetowe od pomysłu po wdrożenie.',
  authors: [{ name: 'Sebastian Siejek', url: 'https://sebastiansiejek.dev/' }],
  creator: 'Sebastian Siejek',
  keywords: [
    'Software Engineer',
    'aplikacje webowe',
    'MVP',
    'automatyzacja procesów',
    'AI',
    'WooCommerce',
    'Next.js',
  ],
}
