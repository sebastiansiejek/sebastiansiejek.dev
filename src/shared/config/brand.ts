// Approved signature-style S (concept C). Keep every export on this silhouette.
export const brandMark = {
  viewBox: '0 0 100 128',
  path: 'M87 8C97 8 98 13 95 21C93 27 89 30 85 28C83 27 83 24 84 22C65 25 32 42 22 51C31 54 52 56 67 62C84 68 87 76 78 85C68 95 33 109 15 117C8 120 1 116 2 108C3 103 13 99 22 95L62 77C48 72 19 71 10 62C-2 51 8 36 22 26C42 14 72 7 87 8Z',
} as const

// Static assets cannot resolve CSS tokens. Match the site's primary palette.
export const brandColors = {
  mint: '#77d9b8',
  ink: '#101713',
  background: '#101411',
  foreground: '#f1f4f0',
  muted: '#a8b0aa',
} as const

export const brandSocialCopy = {
  pl: 'Aplikacje webowe i automatyzacje',
  en: 'Web applications and automation',
} as const

export const brandSocialImages = {
  pl: {
    url: '/images/brand/social-pl.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: `Sebastian Siejek, Software Engineer. ${brandSocialCopy.pl}.`,
  },
  en: {
    url: '/images/brand/social-en.png',
    width: 1200,
    height: 630,
    type: 'image/png',
    alt: `Sebastian Siejek, Software Engineer. ${brandSocialCopy.en}.`,
  },
} as const
