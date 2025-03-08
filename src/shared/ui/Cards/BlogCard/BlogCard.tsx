import Link from 'next/link'
import Image from 'next/legacy/image'
import BlogCardExternalProvider from './BlogCardExternalProvider'

const BlogCard = ({ slug, thumbnail, tags, title, excerpt, url }: IPost) => {
  const href = url || `/blog/${slug}`

  return (
    <Link
      href={href}
      key={slug}
      passHref
      className={
        'group transition-transform rounded-sm shadow-lg flex-col flex cur cursor-pointer hover:-translate-y-1'
      }
      target={url && '_blank'}
      rel={url && 'noopener noreferrer nofollow'}
    >
      {thumbnail && (
        <div className="relative h-[180px]">
          <Image
            src={thumbnail}
            className="w-full object-cover"
            layout={'fill'}
            alt=""
          />
          {url && <BlogCardExternalProvider providerUrl={url} />}
        </div>
      )}
      <div className="bg-n-0 dark:bg-n relative">
        <div className="px-6 py-4">
          <h2 className="transition-colors group-hover:text-primary font-bold text-xl mb-2">
            {title}
          </h2>
          {excerpt && <p className="text-gray-700 line-clamp-3">{excerpt}</p>}
        </div>
        {tags && !!tags.length && (
          <div className="px-6 pt-4 pb-2">
            {tags.split(',').map((tag) => {
              return (
                <span
                  key={tag}
                  className="inline-block bg-n-0 dark:bg-n dark:border-n-0 border rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
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
