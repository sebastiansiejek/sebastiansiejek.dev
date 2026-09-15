import Link from 'next/link'
import Image from 'next/image'
import BlogCardExternalProvider from './blog-card-external-provider'
import { Badge } from 'shared/ui/badge'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'shared/ui/card'

const BlogCard = ({ slug, thumbnail, tags, title, excerpt, url }: IPost) => {
  const href = url || `/blog/${slug}`

  return (
    <Link
      href={href}
      key={slug}
      className="group/link block rounded-xl outline-none"
      target={url && '_blank'}
      rel={url && 'noopener noreferrer nofollow'}
    >
      <Card interactive>
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
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {excerpt && (
            <CardDescription className="line-clamp-3">
              {excerpt}
            </CardDescription>
          )}
        </CardHeader>
        {tags && tags.length > 0 && (
          <CardFooter className="flex-wrap gap-2">
            {tags.split(',').map((tag) => {
              return (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              )
            })}
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}

export default BlogCard
