import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import 'dracula-prism/dist/css/dracula-prism.min.css'
import Image from 'next/image'
import { TextLink } from 'shared/ui/TextLink/TextLink'
import {
  getResourceBySlug,
  getResourcesPaths,
} from 'lib/resources/resourcesService'
import { Suspense } from 'react'
import { Metadata } from 'next'
import Container from 'shared/ui/Container/Container'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getResourcesPaths(
    path.join(process.cwd(), 'src/content/posts'),
  )

  return posts
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params
  const post = await getResourceBySlug(
    slug,
    path.join(process.cwd(), 'src/content/posts'),
  )

  return {
    title: `${post.frontmatter.title} - sebastiansiejek.dev`,
  }
}

export default async function SinglePost(props: PageProps) {
  const { slug } = await props.params
  const post = await getResourceBySlug(
    slug,
    path.join(process.cwd(), 'src/content/posts'),
  )

  return (
    <>
      <Container>
        <h1
          className={
            'font-mono text-3xl mb-12 dark:text-primary font-bold md:text-center'
          }
        >
          {post.frontmatter.title}
        </h1>
      </Container>
      <Container size={'tight'}>
        <main className={'flex flex-col gap-6'}>
          <Suspense fallback={<>Loading...</>}>
            <MDXRemote
              source={post.content}
              components={{
                code: (props) => (
                  <code
                    className={'text-primary bg-n font-mono p-1'}
                    {...props}
                  />
                ),
                ol: (props) => {
                  return <ol className={'list-decimal pl-4'} {...props} />
                },
                ul: (props) => {
                  return <ul className={'list-disc pl-4'} {...props} />
                },
                h2: (props) => (
                  <h2 className={'text-3xl font-medium'} {...props} />
                ),
                h3: (props) => (
                  <h3 className={'text-2xl font-medium'} {...props} />
                ),
                h4: (props) => (
                  <h3 className={'text-xl font-medium'} {...props} />
                ),
                img: (props) => (
                  <Image
                    {...props}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                    }}
                    width={760}
                    height={300}
                  />
                ),
                blockquote: (props) => {
                  return (
                    <blockquote
                      {...props}
                      className={'p-4 bg-n/40 text-n-0 dark:bg-n/90 '}
                    />
                  )
                },
                a: TextLink,
              }}
            />
          </Suspense>
        </main>
      </Container>
    </>
  )
}
