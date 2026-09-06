import Link from 'next/link'
import Image from 'next/image'
import BlogCardExternalProvider from './blog-card-external-provider'

const BlogCard = ({ slug, thumbnail, tags, title, excerpt, url }: IPost) => {
  const href = url || `/blog/${slug}`

  return (
    <Link
      href={href}
      key={slug}
      passHref
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-surface transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      target={url && '_blank'}
      rel={url && 'noopener noreferrer nofollow'}
    >
      {thumbnail && (
        <div className="relative aspect-video">
          <Image
            src={thumbnail}
            className="object-cover"
            fill
            sizes="(max-width: 768px) calc(100vw - 40px), 768px"
            alt=""
          />
          {url && <BlogCardExternalProvider providerUrl={url} />}
        </div>
      )}
      <div className="relative text-foreground">
        <div className="px-6 py-4">
          <h2 className="mb-2 text-xl font-bold transition-colors group-hover:text-accent">
            {title}
          </h2>
          {excerpt && <p className="line-clamp-3 text-muted">{excerpt}</p>}
        </div>
        {tags && tags.length > 0 && (
          <div className="px-6 pt-4 pb-2">
            {tags.split(',').map((tag) => {
              return (
                <span
                  key={tag}
                  className="mr-2 mb-2 inline-block rounded-full border border-border bg-accent-muted px-3 py-1 text-sm font-semibold text-foreground"
                >
                  #{tag}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </Link>
  )
}

export default BlogCard
