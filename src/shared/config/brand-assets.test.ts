/** @jest-environment node */
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { brandColors, brandMark, brandSocialImages } from './brand'

const readAsset = (relativePath: string) =>
  readFileSync(path.join(process.cwd(), relativePath))

describe('committed brand assets', () => {
  it.each([
    'src/app/icon.svg',
    'public/images/brand/mark.svg',
    'public/images/brand/mark-mint.svg',
  ])('keeps the approved silhouette in %s', (assetPath) => {
    const source = readAsset(assetPath).toString()
    expect(source).toContain(`d="${brandMark.path}"`)
    expect(source).toContain(`viewBox="${brandMark.viewBox}"`)
  })

  it('matches the primary palette in the global tokens', () => {
    const styles = readAsset('src/_app/styles/global.css').toString()
    expect(styles).toContain(`--primary: light-dark(${brandColors.mint}, ${brandColors.mint})`)
    expect(styles).toContain(`--primary-foreground: light-dark(${brandColors.ink}, ${brandColors.ink})`)
  })

  it.each(['pl', 'en'] as const)('exports a 1200 × 630 %s social PNG', (locale) => {
    const image = brandSocialImages[locale]
    const source = readAsset(`public${image.url}`)
    expect(source.subarray(1, 4).toString()).toBe('PNG')
    expect(source.readUInt32BE(16)).toBe(image.width)
    expect(source.readUInt32BE(20)).toBe(image.height)
    expect(source.length).toBeLessThan(1_000_000)
  })

  it('exports distinct social cards for each language', () => {
    expect(readAsset(`public${brandSocialImages.pl.url}`)).not.toEqual(
      readAsset(`public${brandSocialImages.en.url}`),
    )
  })

  it('exports a 180 px Apple touch icon', () => {
    const source = readAsset('src/app/apple-icon.png')
    expect(source.readUInt32BE(16)).toBe(180)
    expect(source.readUInt32BE(20)).toBe(180)
  })

  it('embeds native 16, 32 and 48 px PNG frames in the ICO', () => {
    const source = readAsset('src/app/favicon.ico')
    expect(source.readUInt16LE(0)).toBe(0)
    expect(source.readUInt16LE(2)).toBe(1)
    expect(source.readUInt16LE(4)).toBe(3)
    for (const [index, size] of [16, 32, 48].entries()) {
      const directoryOffset = 6 + index * 16
      const frameSize = source.readUInt32LE(directoryOffset + 8)
      const frameOffset = source.readUInt32LE(directoryOffset + 12)
      const frame = source.subarray(frameOffset, frameOffset + frameSize)
      expect(source[directoryOffset]).toBe(size)
      expect(source[directoryOffset + 1]).toBe(size)
      expect(frame.subarray(1, 4).toString()).toBe('PNG')
      expect(frame.readUInt32BE(16)).toBe(size)
      expect(frame.readUInt32BE(20)).toBe(size)
      expect(frame.length).toBe(frameSize)
    }
  })
})
