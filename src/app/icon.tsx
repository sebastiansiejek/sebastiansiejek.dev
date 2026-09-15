import { ImageResponse } from 'next/og'

export function generateImageMetadata() {
  return [
    {
      contentType: 'image/png',
      size: { width: 48, height: 48 },
      id: 'small',
    },
    {
      contentType: 'image/png',
      size: { width: 72, height: 72 },
      id: 'medium',
    },
    {
      contentType: 'image/png',
      size: { width: 96, height: 96 },
      id: 'large',
    },
  ]
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const iconId = await id
  const images = generateImageMetadata()
  const image = images.find((image) => image.id === iconId) ?? images[0]

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: image.size.width * 0.7,
        background: '#3ceab8',
        color: '#0c121a',
      }}
    >
      S
    </div>,
    image.size,
  )
}
