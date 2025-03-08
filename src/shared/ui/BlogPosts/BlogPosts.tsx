import Container from '../Container'
import BlogCard from '../Cards/BlogCard'

interface IBlogPosts {
  posts: IPosts
}

const BlogPosts = ({ posts }: IBlogPosts) => {
  return (
    <section aria-label={'Posts'}>
      <Container className={'grid gap-8'} size={'tight'}>
        {posts.map((post) => {
          return <BlogCard key={post.slug} {...post} />
        })}
      </Container>
    </section>
  )
}

export default BlogPosts
