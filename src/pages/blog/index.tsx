import { NextSeo } from 'next-seo'
import { getAllResources } from '../../lib/resourcesService'
import path from 'path'
import BlogPosts from '../../components/views/BlogPosts'
import PageTemplate from '../../components/views/templates/PageTemplate'

interface IBlogProps {
  posts: IPosts
}

const Blog = (props: IBlogProps) => {
  return (
    <>
      <NextSeo title={'Blog - SebastianSiejek.dev'} />
      <PageTemplate>
        <BlogPosts posts={props.posts} />
      </PageTemplate>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = getAllResources(path.join(process.cwd(), 'src/content/posts'))

  return {
    props: { posts },
  }
}

export default Blog
