import content from './generated/content.json'

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  sku: string
  description: string
  image?: string
  intro?: string
  supplierName?: string
  manufacturer?: string
  supplierCode?: string
  packSize?: string
  onlineCode?: string
  variants?: { name: string; pack: string; code: string }[]
}

export const productIntro = (p: Product) => p.intro ?? p.description.split(/(?<=\.)\s/)[0]

// sadržaj dolazi iz Sanity CMS-a (scripts/fetch-content.mjs)
export const products = content.products as Product[]

export const productCategoryList = Array.from(new Set(products.map((p) => p.category))).sort()
export const productBrandList = Array.from(new Set(products.map((p) => p.brand))).sort()
