import { content } from './live'

export interface Franchise {
  slug: string
  city: string
  name: string
  address?: string
  phone?: string // više brojeva odvojeno sa ", "
  email?: string
  hours?: string[]
  image?: string
}

export const franchises = content.franchises as Franchise[]
