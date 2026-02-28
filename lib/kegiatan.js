import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const kegiatanDirectory = path.join(process.cwd(), "content/kegiatan")

export function getAllKegiatan() {
  const fileNames = fs.readdirSync(kegiatanDirectory)

  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(kegiatanDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      ...data,
    }
  })
}

export async function getKegiatanBySlug(slug) {
  const fullPath = path.join(kegiatanDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const processedContent = await remark()
    .use(html)
    .process(content)

  return {
    slug,
    content: processedContent.toString(),
    ...data,
  }
}