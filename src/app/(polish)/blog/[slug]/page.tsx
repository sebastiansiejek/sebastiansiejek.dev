import path from 'node:path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import { TextLink } from 'shared/ui/text-link'
import { getResourceBySlug, getResourcesPaths } from 'shared/lib/resources/index.server'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { SiteContainer } from 'shared/ui/site-layout'

type PageProperties = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return await getResourcesPaths(path.join(process.cwd(), 'src/content/posts'))
}

export async function generateMetadata(properties: PageProperties): Promise<Metadata> {
  const { slug } = await properties.params
  const post = await getResourceBySlug(
    slug,
    path.join(process.cwd(), 'src/content/posts'),
  )

  return {
    title: `${post.frontmatter.title} - sebastiansiejek.dev`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default async function SinglePost(properties: PageProperties) {
  const { slug } = await properties.params
  const post = await getResourceBySlug(
    slug,
    path.join(process.cwd(), 'src/content/posts'),
  )

  return (
    <>
      <SiteContainer size="medium">
        <h1
          className={
            'mb-12 font-mono text-3xl font-bold text-primary md:text-center'
          }
        >
          {post.frontmatter.title}
        </h1>
      </SiteContainer>
      <SiteContainer size="tight">
        <article className="blog-article flex flex-col gap-6">
          <Suspense fallback={<>Loading...</>}>
            <MDXRemote
              source={post.content}
              components={{
                ol: (properties) => {
                  return <ol className={'list-decimal pl-4'} {...properties} />
                },
                ul: (properties) => {
                  return <ul className={'list-disc pl-4'} {...properties} />
                },
                h2: (properties) => (
                  <h2 className={'text-3xl font-medium'} {...properties} />
                ),
                h3: (properties) => (
                  <h3 className={'text-2xl font-medium'} {...properties} />
                ),
                h4: (properties) => (
                  <h3 className={'text-xl font-medium'} {...properties} />
                ),
                img: (properties) => {
                  const alt = properties.alt || ''

                  return (
                    <Image
                      {...properties}
                      alt={alt}
                      sizes="100vw"
                      style={{
                        width: '100%',
                        height: 'auto',
                      }}
                      width={760}
                      height={300}
                    />
                  )
                },
                blockquote: (properties) => {
                  return (
                    <blockquote
                      {...properties}
                      className="bg-card p-4 text-foreground"
                    />
                  )
                },
                a: ({ href, ...properties }) => {
                  const target = href.startsWith('http') ? '_blank' : ''
                  const relationship =
                    target === '_blank' ? 'noopener noreferrer' : ''

                  return (
                    <TextLink
                      href={href}
                      target={target}
                      rel={relationship}
                      {...properties}
                    />
                  )
                },
              }}
            />
          </Suspense>
        </article>
      </SiteContainer>
    </>
  )
}
