import type { MetadataRoute } from 'next'
import * as process from 'node:process'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    host: process.env.SITE_URL,
    sitemap: `${process.env.SITE_URL}/sitemap.xml`,
  }
}
