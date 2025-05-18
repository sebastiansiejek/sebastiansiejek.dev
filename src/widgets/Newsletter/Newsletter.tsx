'use client'

import Container from '@/shared/ui/Container/Container'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { useForm } from 'react-hook-form'
import { H3 } from '@/shared/ui/typography'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  email: z.string().email(),
})

export const Newsletter = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  return (
    <Container
      className={'min-h-96 flex flex-col items-center justify-center'}
      size={'tight'}
    >
      <H3 className={'mb-8'}>Subscribe to the Newsletter</H3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {})}
          className={'flex gap-2 flex-col'}
        >
          <FormField
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type={'email'}
                    placeholder={'john@gmail.com'}
                    className={'bg-inherit!'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name={'email'}
          />
          <Button type={'submit'} className={'w-full'}>
            Subscribe
          </Button>
        </form>
      </Form>
    </Container>
  )
}
