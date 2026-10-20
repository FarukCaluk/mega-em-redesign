import { brandTexts } from './brandTexts'

export interface Brand {
  name: string
  logo?: string
  intro?: string
  long?: string
}

// Redoslijed prema Brendovi.xlsx. [naziv, datoteka loga]
const list: [string, string?][] = [
  ['MIPA', 'mipa-logo.png'],
  ['PPG', 'ppg-logo.webp'],
  ['Nexa Autocolor', 'nexa-logo.webp'],
  ['Duxone', 'duxone-logo.png'],
  ['Cromax', 'cromax-logo.png'],
  ['3M', '3m-logo.png'],
  ['Catalfer', 'catalfer-logo.webp'],
  ['Meguiar’s', 'meguiars-logo.png'],
  ['Liquid Elements', 'liquid-elements-logo.webp'],
  ['Walcom', 'walcom-logo.webp'],
  ['SATA', 'sata-logo.webp'],
  ['Auarita', 'auarita-logo.webp'],
  ['ShineMate', 'shinemate-logo.webp'],
  ['KRAUSS', 'kraus-logo.webp'],
  ['Mirka', 'mirka-logo.webp'],
  ['Oxyline', 'oxyline-logo.webp'],
  ['OLYM', 'olym-logo.webp'],
  ['Kenda', 'kenda-logo.webp'],
  ['Feral', 'feral-logo.webp'],
  ['COOL', 'cool-logo.webp'],
  ['Apel', 'apel-logo.webp'],
  ['Akfix', 'akfix-logo.webp'],
  ['Cartotecnica', 'cartotecnica-logo.webp'],
  ['Henelit', 'henelit-logo.webp'],
  ['SunnyPads', 'sunnypads-logo.webp'],
  ['VMD', 'vmd-logo.webp'],
  ['Work Stuff', 'work-stuff-logo.webp'],
  ['Alberdingk Boley', 'alberding-logo.webp'],
  ['Çimsa', 'cimsa-logo.webp'],
  ['Danucem', 'danucem-logo.svg'],
  ['Calucem', 'calucem-logo.webp'],
  ['Ashland', 'ashland-logo.webp'],
  ['Berolan', 'berolan-logo.webp'],
  ['Graf & Co', 'graf-co-logo.webp'],
  ['IMI Fabi', 'imifabi-logo.webp'],
  ['JELU-WERK', 'jelu-werk-logo.webp'],
  ['KDO Kundu Chemicals', 'kdo-logo.webp'],
  ['LANXESS', 'lanxess-logo.webp'],
  ['Organik Kimya', 'organik-kimya-logo.webp'],
  ['Rowis', 'rowis-logo.webp'],
  ['Troy', 'troy-logo.webp'],
  ['Loufakis'],
  ['SIA', 'sia-logo.webp'],
]

export const brands: Brand[] = list.map(([name, file]) => ({
  name,
  logo: file && `/images/partners/${file}`,
  intro: brandTexts[name]?.[0],
  long: brandTexts[name]?.[1],
}))

export const brandByName = (name: string | null) => (name ? brands.find((b) => b.name.toLowerCase() === name.toLowerCase()) : undefined)
