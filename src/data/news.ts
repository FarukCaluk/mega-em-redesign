import content from './generated/content.json'

export interface NewsPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  content: string[]
}

export const newsPosts = content.news as NewsPost[]
