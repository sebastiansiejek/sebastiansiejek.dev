import BlogCard from 'shared/ui/cards/blog-card/blog-card'
import { SiteContainer } from 'shared/ui/site-layout'

interface IBlogPosts {
  posts: IPosts
}

const BlogPosts = ({ posts }: IBlogPosts) => {
  return (
    <section aria-label={'Posts'}>
      <SiteContainer className={'grid gap-8'} size={'tight'}>
        {posts.map((post) => {
          return <BlogCard key={post.slug} {...post} />
        })}
      </SiteContainer>
    </section>
  )
}

export default BlogPosts
