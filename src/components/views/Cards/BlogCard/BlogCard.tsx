import Link from 'next/link'
import Image from 'next/image'

const BlogCard = ({ slug, thumbnail, tags, title, excerpt }: IPost) => {
  return (
    <Link href={`/blog/${slug}`} key={slug} passHref>
      <a
        className={
          'group transition-transform rounded shadow-lg flex-col flex cur cursor-pointer hover:-translate-y-1'
        }
      >
        {thumbnail && (
          <div className="relative h-[180px]">
            <Image
              src={thumbnail}
              className="w-full"
              layout={'fill'}
              objectFit={'cover'}
              alt=""
            />
          </div>
        )}
        <div className="bg-n-0 dark:bg-n">
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
      </a>
    </Link>
  )
}

export default BlogCard
