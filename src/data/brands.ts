import { brandTexts } from './brandTexts'

export interface Brand {
  name: string
  logo?: string
  intro?: string
  long?: string
}

// Redoslijed prema Brendovi.xlsx; zatim ostali ranije dodani brendovi. [naziv, datoteka loga]
const list: [string, string?][] = [
  ['MIPA', 'mipa-logo.png'], ['PPG', 'ppg-logo.webp'], ['Nexa Autocolor', 'nexa-logo.webp'], ['Duxone', 'duxone-logo.png'],
  ['Cromax', 'cromax-logo.png'], ['3M', '3m-logo.png'], ['Catalfer', 'catalfer-logo.webp'], ['Meguiars', 'meguiars-logo.png'],
  ['Liquid Elements', 'liquid-elements-logo.webp'], ['Walcom', 'walcom-logo.webp'], ['SATA', 'sata-logo.webp'], ['Auarita', 'auarita-logo.webp'],
  ['Shinemate', 'shinemate-logo.webp'], ['Kraus', 'kraus-logo.webp'], ['Mirka', 'mirka-logo.webp'], ['Oxyline', 'oxyline-logo.webp'],
  ['Olym', 'olym-logo.webp'], ['Kenda', 'kenda-logo.webp'], ['Feral', 'feral-logo.webp'], ['COOL', 'cool-logo.webp'],
  ['Apel', 'apel-logo.webp'], ['Akfix', 'akfix-logo.webp'], ['Cartotecnica', 'cartotecnica-logo.webp'], ['Henelit', 'henelit-logo.webp'],
  ['SunnyPads', 'sunnypads-logo.webp'], ['VMD', 'vmd-logo.webp'], ['Work Stuff', 'work-stuff-logo.webp'], ['Alberding', 'alberding-logo.webp'],
  ['Cimsa', 'cimsa-logo.webp'], ['Danucem', 'danucem-logo.svg'], ['Calucem', 'calucem-logo.webp'], ['Ashland', 'ashland-logo.webp'],
  ['Berolan', 'berolan-logo.webp'], ['Graf & Co', 'graf-co-logo.webp'], ['Imifabi', 'imifabi-logo.webp'], ['Jelu Werk', 'jelu-werk-logo.webp'],
  ['KDO Kundu Chemicals', 'kdo-logo.webp'], ['Lanxess', 'lanxess-logo.webp'], ['Organik Kimya', 'organik-kimya-logo.webp'],
  ['Rowis', 'rowis-logo.webp'], ['Troy', 'troy-logo.webp'], ['Loufakis'],
  ['4CR', '4cr-logo.png'], ['Axalta', 'axalta-logo.png'], ['Colorit', 'colorit-logo.png'], ['CRS', 'crs-logo.png'],
  ['Draumet', 'draumet-logo.png'], ['DuPont', 'dupont-logo.png'], ['EGA', 'ega-logo.png'], ['Faster', 'faster-logo.png'],
  ['Forester', 'forester-logo.png'], ['Gebol', 'gebol-logo.png'], ['Higo', 'higo-logo.png'], ['Indasa', 'indasa-logo.png'],
  ['Kromaks', 'kromaks-logo.png'], ['Protect2u', 'protect2u-logo.png'], ['Rupes', 'rupes-logo.png'], ['SAGOLA', 'sagola-logo.png'],
  ['Smirdex', 'smirdex-logo.png'], ['Trensar', 'trensar-logo.png'], ['SIA', 'sia-logo.webp'],
]

export const brands: Brand[] = list.map(([name, file]) => ({
  name,
  logo: file && `/images/partners/${file}`,
  intro: brandTexts[name]?.[0],
  long: brandTexts[name]?.[1],
}))

export const brandByName = (name: string | null) => (name ? brands.find((b) => b.name.toLowerCase() === name.toLowerCase()) : undefined)
