// Povlači sadržaj iz Sanityja i upisuje ga u src/data/generated/content.json (pokreće se prije svakog builda).
// Taj fajl je samo rezerva: sajt u pregledniku povlači svježi sadržaj uživo (src/data/live.ts).
// Ako Sanity nije dostupan, ostaje zadnji sačuvani content.json, pa build ne puca.
import {mkdirSync, writeFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {PROJECT, QUERY, buildContent} from '../src/data/sanityContent.js'

const DATASET = process.env.SANITY_DATASET || 'production'
const out = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/generated/content.json')

async function main() {
  const url = `https://${PROJECT}.api.sanity.io/v2025-01-01/data/query/${DATASET}?query=${encodeURIComponent(QUERY)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sanity odgovor ${res.status}`)
  const {result: r} = await res.json()
  const content = buildContent(r, DATASET)
  if (!content.products.length) throw new Error('Sanity je vratio 0 proizvoda, ne prepisujem sačuvani sadržaj')
  mkdirSync(dirname(out), {recursive: true})
  writeFileSync(out, JSON.stringify(content))
  console.log(`[sadržaj] proizvoda: ${content.products.length}, vijesti: ${content.news.length}, brendova: ${content.brands.length}`)
}

main().catch((e) => {
  console.warn(`[sadržaj] preskočeno (${e.message}), koristi se sačuvana verzija`)
})
