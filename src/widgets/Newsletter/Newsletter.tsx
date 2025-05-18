'use client'

import Container from '@/shared/ui/Container/Container'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'

export const Newsletter = () => {
  return (
    <Container
      className={'min-h-96 flex items-center justify-center'}
      size={'tight'}
    >
      <Input />
      <Button type={'submit'}>Send</Button>
    </Container>
  )
}
