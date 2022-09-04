import Container from '../Container'
import BlogCard from '../Cards/BlogCard'

interface IBlogPosts {
  posts: IPosts
}

const BlogPosts = ({ posts }: IBlogPosts) => {
  return (
    <section aria-label={'Posts'}>
      <Container className={'grid md:grid-cols-3 gap-10'}>
        {posts.map((post) => {
          return <BlogCard key={post.slug} {...post} />
        })}
      </Container>
    </section>
  )
}

export default BlogPosts
