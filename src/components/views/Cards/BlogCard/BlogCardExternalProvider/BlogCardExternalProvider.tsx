import Image from 'next/image'
import { getProviderLogo } from '../../../../../utils/getProviderLogo'

interface IBlogCardExternalProvider {
  providerUrl: string
}

const BlogCardExternalProvider = ({
  providerUrl,
}: IBlogCardExternalProvider) => {
  const src = getProviderLogo(providerUrl)

  if (!src) return null

  return (
    <div className="bg-n-0 p-1 flex absolute top-0 right-0">
      <Image src={src} width={80} height={25} objectFit={'contain'} alt={src} />
    </div>
  )
}

export default BlogCardExternalProvider
