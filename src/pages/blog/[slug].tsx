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
import ContentStyled from '../../styles/ContentStyled'

const SinglePost = ({ post }: any) => {
  return (
    <>
      <NextSeo title={`${post.slug} - sebastiansiejek.dev`} />
      <PageTemplate>
        <Container size={'tight'}>
          <ContentStyled>
            <MDXRemote
              {...post.transformedMdx}
              components={{
                code: (props) => (
                  <code
                    className={'text-primary bg-n font-mono p-1'}
                    {...props}
                  />
                ),
                ol: (list) => {
                  return (
                    <ol className={'list-decimal pl-4'}>{list.children}</ol>
                  )
                },
                ul: (list) => {
                  return <ul className={'list-disc pl-4'}>{list.children}</ul>
                },
              }}
            />
          </ContentStyled>
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
