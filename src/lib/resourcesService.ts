import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { serialize } from 'next-mdx-remote/serialize'

const MDX_PATTERN = /\.mdx?$/

export const getResourcesSlugs = (resourcePath: string) => {
  return fs.readdirSync(resourcePath).filter((path) => MDX_PATTERN.test(path))
}

export const getResourceBySlug = async (slug: string, resourcePath: string) => {
  const resourceFilePath = path.join(resourcePath, `${slug}.mdx`)
  const source = fs.readFileSync(resourceFilePath)
  const { content, data } = matter(source)
  const frontmatter = {
    ...data,
  }

  const transformedMdx = await serialize(content, {
    mdxOptions: {},
    scope: data,
  })

  return { transformedMdx, frontmatter }
}

export const getResourcesPaths = async (resourcePath: string) => {
  const resourcesSlugs = getResourcesSlugs(resourcePath)

  return resourcesSlugs
    .map((path) => path.replace(MDX_PATTERN, ''))
    .map((slug) => ({ params: { slug } }))
}

export const getResourceFrontmatter = ({
  filename,
  resourcePath,
}: {
  readonly filename: string
  readonly resourcePath: string
}) => {
  const slug = filename.replace(MDX_PATTERN, '')
  const fullPath = path.join(resourcePath, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content, data } = matter(fileContents)

  return { ...data, slug, content }
}

export const getAllResources = (resourcePath: string) => {
  const fileNames = fs.readdirSync(resourcePath)

  return fileNames.map((filename: string) => {
    return getResourceFrontmatter({
      filename,
      resourcePath,
    })
  })
}
