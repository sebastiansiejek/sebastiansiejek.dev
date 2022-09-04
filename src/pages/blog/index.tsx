import Navbar from 'components/containers/Navbar'
import { NextSeo } from 'next-seo'
import { getAllResources } from '../../lib/resourcesService'
import path from 'path'
import BlogPosts from '../../components/views/BlogPosts'

interface IBlogProps {
  posts: IPosts
}

const Blog = (props: IBlogProps) => {
  return (
    <>
      <NextSeo title={'Blog - SebastianSiejek.dev'} />
      <Navbar />
      <main className="py-12 min-h-[100vw]">
        <BlogPosts posts={props.posts} />
      </main>
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
