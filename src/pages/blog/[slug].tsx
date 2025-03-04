import {
  getResourceBySlug,
  getResourcesPaths,
} from '../../lib/resources/resourcesService'
import path from 'path'
import PageTemplate from '../../components/views/templates/PageTemplate'
import Container from '../../components/views/Container'
import { GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'
import 'dracula-prism/dist/css/dracula-prism.min.css'
import Image from 'next/image'

import './blog.styles.css'
import { TextLink } from 'shared/ui/TextLink/TextLink'

const SinglePost = ({ post }: any) => {
  return (
    <>
      <NextSeo title={`${post.frontmatter.title} - sebastiansiejek.dev`} />
      <PageTemplate>
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
          <main>
            <MDXRemote
              {...post.transformedMdx}
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
                a: TextLink,
              }}
            />
          </main>
        </Container>
      </PageTemplate>
    </>
  )
}

export default SinglePost

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.slug as string
  const post = await getResourceBySlug(
    slug,
    path.join(process.cwd(), 'src/content/posts'),
  )

  return {
    props: { post: { ...post, slug } },
  }
}

export async function getStaticPaths() {
  return {
    paths: await getResourcesPaths(
      path.join(process.cwd(), 'src/content/posts'),
    ),
    fallback: false,
  }
}
