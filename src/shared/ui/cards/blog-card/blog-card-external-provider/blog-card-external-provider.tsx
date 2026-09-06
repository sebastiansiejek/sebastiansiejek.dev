import Image from 'next/image'
import { getProviderLogo } from 'shared/utils/get-provider-logo'

interface IBlogCardExternalProvider {
  providerUrl: string
}

const BlogCardExternalProvider = ({
  providerUrl,
}: IBlogCardExternalProvider) => {
  const source = getProviderLogo(providerUrl)

  if (!source) return

  return (
    <div className="absolute top-0 right-0 flex bg-foreground p-1">
      <Image
        src={source}
        width={80}
        height={25}
        className={'object-contain'}
        alt={source}
      />
    </div>
  )
}

export default BlogCardExternalProvider
