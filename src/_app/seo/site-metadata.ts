import type { Metadata } from 'next'
import { brandSocialImages } from 'shared/config/brand'

const siteUrl = process.env.SITE_URL || 'https://sebastiansiejek.dev'
const defaultSocialImage = {
  ...brandSocialImages.pl,
  url: `${siteUrl}${brandSocialImages.pl.url}`,
}

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sebastian Siejek | Software Engineer',
    template: '%s | Sebastian Siejek',
  },
  description:
    'Software Engineer tworzący aplikacje webowe, automatyzacje i sklepy internetowe od pomysłu po wdrożenie.',
  authors: [{ name: 'Sebastian Siejek', url: 'https://sebastiansiejek.dev/' }],
  creator: 'Sebastian Siejek',
  openGraph: {
    siteName: 'Sebastian Siejek',
    locale: 'pl_PL',
    type: 'website',
    images: [defaultSocialImage],
  },
  twitter: {
    card: 'summary_large_image',
    images: [defaultSocialImage],
  },
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
