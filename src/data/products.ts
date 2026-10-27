import content from './generated/content.json'

export interface Product {
  id: string
  name: string
  brand: string
  category: string
  subcategory?: string
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

const uniq = (xs: (string | undefined)[]) => Array.from(new Set(xs.filter((x): x is string => Boolean(x)))).sort((a, b) => a.localeCompare(b, 'bs'))
export const productCategoryList = uniq(products.map((p) => p.category))
export const productBrandList = uniq(products.map((p) => p.brand))
export const productSubcategoryList = uniq(products.map((p) => p.subcategory))
// podkategorije po kategoriji (za filter koji prikazuje samo relevantne)
export const subcategoriesOf = (cats: string[]) => uniq(products.filter((p) => cats.includes(p.category)).map((p) => p.subcategory))
