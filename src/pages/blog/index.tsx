import Navbar from 'components/containers/Navbar'
import { NextSeo } from 'next-seo'
import { getAllResources } from '../../lib/resourcesService'
import path from 'path'
import BlogPosts from '../../components/views/BlogPosts'
import Socials from '../../components/containers/Socials'

interface IBlogProps {
  posts: IPosts
}

const Blog = (props: IBlogProps) => {
  return (
    <>
      <NextSeo title={'Blog - SebastianSiejek.dev'} />
      <Navbar />
      <main className="py-12 min-h-[100vh]">
        <BlogPosts posts={props.posts} />
      </main>
      <footer className={'bg-n py-12 text-n-0'}>
        <div className="flex items-center justify-center flex-col">
          <Socials />
          <p className={'mt-5'}>
            © 2022 sebastiansiejek.dev. All rights reserved
          </p>
        </div>
      </footer>
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
