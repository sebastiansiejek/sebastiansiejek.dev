import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'
import { brandColors, brandMark, brandSocialCopy } from '../src/shared/config/brand.ts'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const appDirectory = path.join(projectRoot, 'src/app')
const brandDirectory = path.join(projectRoot, 'public/images/brand')
await mkdir(brandDirectory, { recursive: true })

const mark = (color) => `<path fill="${color}" d="${brandMark.path}"/>`
const logo = (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${brandMark.viewBox}" width="100" height="128">${mark(color)}</svg>\n`
const icon = (rounded) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="${rounded ? 20 : 0}" fill="${brandColors.mint}"/><svg x="20" y="12" width="60" height="76" viewBox="${brandMark.viewBox}">${mark(brandColors.ink)}</svg></svg>\n`

await Promise.all([
  writeFile(path.join(brandDirectory, 'mark.svg'), logo(brandColors.ink)),
  writeFile(path.join(brandDirectory, 'mark-mint.svg'), logo(brandColors.mint)),
  writeFile(path.join(appDirectory, 'icon.svg'), icon(true)),
  sharp(Buffer.from(icon(false))).resize(180, 180).png().toFile(path.join(appDirectory, 'apple-icon.png')),
])

// ICO directory containing PNG frames for modern browsers, at native tab sizes.
const iconSizes = [16, 32, 48]
const frames = await Promise.all(iconSizes.map((size) =>
  sharp(Buffer.from(icon(true))).resize(size, size).png().toBuffer(),
))
const directory = Buffer.alloc(6 + frames.length * 16)
directory.writeUInt16LE(1, 2)
directory.writeUInt16LE(frames.length, 4)
let frameOffset = directory.length
for (const [index, frame] of frames.entries()) {
  const entryOffset = 6 + index * 16
  directory.writeUInt8(iconSizes[index], entryOffset)
  directory.writeUInt8(iconSizes[index], entryOffset + 1)
  directory.writeUInt16LE(1, entryOffset + 4)
  directory.writeUInt16LE(32, entryOffset + 6)
  directory.writeUInt32LE(frame.length, entryOffset + 8)
  directory.writeUInt32LE(frameOffset, entryOffset + 12)
  frameOffset += frame.length
}
await writeFile(path.join(appDirectory, 'favicon.ico'), Buffer.concat([directory, ...frames]))

for (const [locale, copy] of Object.entries(brandSocialCopy)) {
  const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${brandColors.background}"/>
    <svg x="90" y="156" width="240" height="308" viewBox="${brandMark.viewBox}">${mark(brandColors.mint)}</svg>
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="428" y="240" font-size="76" font-weight="700" fill="${brandColors.foreground}">Sebastian</text>
      <text x="428" y="326" font-size="76" font-weight="700" fill="${brandColors.foreground}">Siejek</text>
      <text x="432" y="389" font-size="32" fill="${brandColors.mint}">Software Engineer</text>
      <text x="432" y="440" font-size="25" fill="${brandColors.muted}">${copy}</text>
      <text x="90" y="553" font-size="23" fill="${brandColors.muted}">sebastiansiejek.dev</text>
    </g>
  </svg>`
  await sharp(Buffer.from(social)).png().toFile(path.join(brandDirectory, `social-${locale}.png`))
}

console.log('Generated signature S logos, SVG/ICO favicon, Apple icon and PL/EN social cards.')
