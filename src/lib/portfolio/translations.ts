import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { projects, type ProjectKey } from './projects'

export async function getLocalizedProjects(locale: Locale) {
  const t = await getTranslations({ locale, namespace: 'Projects' })

  return {
    upominkly: {
      ...projects.upominkly,
      kind: t('upominkly.kind'),
      summary: t('upominkly.summary'),
      imageAlt: t('upominkly.imageAlt'),
      role: t('upominkly.role'),
      challenge: t('upominkly.challenge'),
      decisions: [
        t('upominkly.decisions.sharing'),
        t('upominkly.decisions.states'),
        t('upominkly.decisions.funding'),
        t('upominkly.decisions.privacy'),
      ],
      result: t('upominkly.result'),
      lesson: t('upominkly.lesson'),
      credit: null,
    },
    'planning-poker': {
      ...projects['planning-poker'],
      kind: t('planning-poker.kind'),
      summary: t('planning-poker.summary'),
      imageAlt: t('planning-poker.imageAlt'),
      role: t('planning-poker.role'),
      challenge: t('planning-poker.challenge'),
      decisions: [
        t('planning-poker.decisions.realtime'),
        t('planning-poker.decisions.focus'),
        t('planning-poker.decisions.entry'),
      ],
      result: t('planning-poker.result'),
      lesson: t('planning-poker.lesson'),
      credit: null,
    },
    'not-bad-studio': {
      ...projects['not-bad-studio'],
      kind: t('not-bad-studio.kind'),
      summary: t('not-bad-studio.summary'),
      imageAlt: t('not-bad-studio.imageAlt'),
      role: t('not-bad-studio.role'),
      challenge: t('not-bad-studio.challenge'),
      decisions: [
        t('not-bad-studio.decisions.attribution'),
        t('not-bad-studio.decisions.commerce'),
        t('not-bad-studio.decisions.responsive'),
      ],
      result: t('not-bad-studio.result'),
      lesson: t('not-bad-studio.lesson'),
      credit: t('not-bad-studio.credit'),
    },
  } satisfies Record<ProjectKey, object>
}

export type LocalizedProjects = Awaited<ReturnType<typeof getLocalizedProjects>>
