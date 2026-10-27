import content from './generated/content.json'

export interface Brand {
  name: string
  logo?: string
  intro?: string
  long?: string
}

export const brands = content.brands as Brand[]

export const brandByName = (name: string | null) => (name ? brands.find((b) => b.name.toLowerCase() === name.toLowerCase()) : undefined)
