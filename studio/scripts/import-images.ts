// Masovno dodavanje slika proizvodima iz foldera sa slikama.
// Slike se povezuju po nazivu fajla: šifra Mega-Em (npr. NON00029.jpg) ili naziv proizvoda (npr. "3M Polir pasta.jpg").
// Probni prolaz:  IMAGES="C:/putanja/do/foldera" DRY=1 npx sanity exec scripts/import-images.ts --with-user-token
// Pravi upis:     IMAGES="C:/putanja/do/foldera" npx sanity exec scripts/import-images.ts --with-user-token
// Proizvodi koji već imaju sliku se preskaču (da se ne prepiše ručno dodata); OVERWRITE=1 prepisuje.
import {readdirSync, readFileSync} from 'node:fs'
import {extname, join} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {deployPaused} from './deploy'

const DIR = process.env.IMAGES
const DRY = process.env.DRY === '1'
const OVERWRITE = process.env.OVERWRITE === '1'
if (!DIR) {
  console.error('Zadajte folder: IMAGES="C:/putanja/do/foldera"')
  process.exit(1)
}

const norm = (t: string | null | undefined) => String(t ?? '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '')
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp'])

async function run() {
  const client = getCliClient({apiVersion: '2025-01-01'})
  const products: {_id: string; name: string; sku?: string; hasImage: boolean; variantNames?: string[]}[] = await client.fetch(
    '*[_type=="product" && hidden != true]{_id, name, sku, "hasImage": defined(image.asset), "variantNames": variants[].name}',
  )
  const index = new Map<string, (typeof products)[number]>()
  for (const p of products) {
    if (p.sku) index.set(norm(p.sku), p)
    index.set(norm(p.name), p)
    for (const v of (p.variantNames ?? []).filter(Boolean)) if (!index.has(norm(v))) index.set(norm(v), p)
  }

  const files = readdirSync(DIR).filter((f) => EXT.has(extname(f).toLowerCase()))
  const matched: {file: string; product: (typeof products)[number]}[] = []
  const unmatched: string[] = []
  const used = new Set<string>()
  for (const f of files) {
    const p = index.get(norm(f.slice(0, f.length - extname(f).length)))
    if (!p) unmatched.push(f)
    else if (used.has(p._id)) console.log('već ima sliku iz ovog foldera, preskačem:', f, '->', p.name)
    else if (p.hasImage && !OVERWRITE) console.log('već ima sliku, preskačem:', p.name)
    else {
      used.add(p._id)
      matched.push({file: f, product: p})
    }
  }
  console.log(`slika u folderu: ${files.length}, spojeno: ${matched.length}, bez para: ${unmatched.length}`)
  if (unmatched.length) console.log('bez para (provjerite naziv fajla):', unmatched.slice(0, 30))
  if (DRY) return console.log('DRY: ništa nije upisano')

  for (const [i, m] of matched.entries()) {
    const asset = await client.assets.upload('image', readFileSync(join(DIR, m.file)), {filename: m.file})
    await client.patch(m.product._id).set({image: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}}).commit()
    if ((i + 1) % 25 === 0 || i === matched.length - 1) console.log(`upisano ${i + 1}/${matched.length}`)
  }
}
deployPaused(run, {skip: DRY}).catch((e) => {
  console.error(e)
  process.exit(1)
})
