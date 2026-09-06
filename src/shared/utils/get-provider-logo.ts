export const getProviderLogo = (providerUrl: string) => {
  if (providerUrl.includes('empressia')) {
    return '/images/empressia.svg'
  }

  if (providerUrl.includes('geek.justjoin.it')) {
    return '/images/justgeek-it.svg'
  }

  return ''
}
