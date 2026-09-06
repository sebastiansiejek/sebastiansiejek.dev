import enMessages from '../../../../messages/en.json'
import plMessages from '../../../../messages/pl.json'
import { projectKeys, projects } from './projects'
import { siteConfig } from 'shared/config/site'

const messageShape = (value) => {
  if (typeof value === 'string') {
    return 'message'
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, nestedValue]) => [
      key,
      messageShape(nestedValue),
    ]),
  )
}

describe('portfolio content', () => {
  it('defines configuration and localized copy for every case study', () => {
    for (const projectKey of projectKeys) {
      expect(projects[projectKey].name).toBeTruthy()
      expect(plMessages.Projects[projectKey].summary).toBeTruthy()
      expect(enMessages.Projects[projectKey].summary).toBeTruthy()
    }
  })

  it('keeps invariant data outside translation catalogs', () => {
    expect(siteConfig.contactEmail).toBe('siejeksebastian@gmail.com')
    expect(siteConfig.facts.deliveredWebProjects).toBe(100)

    for (const messages of [plMessages, enMessages]) {
      expect(JSON.stringify(messages)).not.toContain(siteConfig.contactEmail)

      for (const projectKey of projectKeys) {
        expect(Object.keys(messages.Projects[projectKey])).not.toEqual(
          expect.arrayContaining([
            'key',
            'name',
            'image',
            'liveUrl',
            'repoUrl',
            'stack',
          ]),
        )
      }
    }
  })

  it('does not use long dash characters in visible portfolio copy', () => {
    const visibleCopy = JSON.stringify({ plMessages, enMessages })
    expect(visibleCopy).not.toMatch(/[—–]/)
  })

  it('keeps the same message structure in both locales', () => {
    expect(messageShape(enMessages)).toEqual(messageShape(plMessages))
  })
})
