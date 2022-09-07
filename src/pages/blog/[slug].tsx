import {
  getResourceBySlug,
  getResourcesPaths,
} from '../../lib/resourcesService'
import path from 'path'
import PageTemplate from '../../components/views/templates/PageTemplate'
import Container from '../../components/views/Container'
import { GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { NextSeo } from 'next-seo'

const SinglePost = ({ post }: any) => {
  return (
    <>
      <NextSeo title={`${post.slug} - sebastiansiejek.dev`} />
      <PageTemplate>
        <Container size={'tight'}>
          <MDXRemote
            {...post.transformedMdx}
            components={{
              code: (props) => (
                <code
                  className={'text-primary bg-n font-mono p-1'}
                  {...props}
                />
              ),
            }}
          />
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
