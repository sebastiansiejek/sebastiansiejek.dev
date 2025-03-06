import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const MDX_PATTERN = /\.mdx?$/

export const getResourcesSlugs = (resourcePath: string) => {
  return fs.readdirSync(resourcePath).filter((path) => MDX_PATTERN.test(path))
}

export const getResourceBySlug = async (slug: string, resourcePath: string) => {
  const resourceFilePath = path.join(resourcePath, `${slug}.mdx`)
  const source = fs.readFileSync(resourceFilePath)
  const { content, data } = matter(source)

  return { content, frontmatter: data }
}

export const getResourcesPaths = async (resourcePath: string) => {
  const resourcesSlugs = getResourcesSlugs(resourcePath)

  return resourcesSlugs
    .map((path) => path.replace(MDX_PATTERN, ''))
    .map((slug) => ({ slug }))
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

  return { ...data, publishedAt: data.publishedAt || '', slug, content }
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

export const sortResources = (resources: any[]) =>
  resources.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
