import { partners } from './content'

export interface Brand {
  name: string
  logo?: string
  intro?: string
  long?: string
}

const names: Record<string, string> = {
  '3m': '3M', '4cr': '4CR', axalta: 'Axalta', colorit: 'Colorit', cromax: 'Cromax', crs: 'CRS', draumet: 'Draumet',
  dupont: 'DuPont', duxone: 'Duxone', ega: 'EGA', faster: 'Faster', forester: 'Forester', gebol: 'Gebol', higo: 'Higo',
  indasa: 'Indasa', kromaks: 'Kromaks', meguiars: 'Meguiars', mipa: 'MIPA', protect2u: 'Protect2u', rupes: 'Rupes',
  sagola: 'SAGOLA', smirdex: 'Smirdex', trensar: 'Trensar',
}

// ponytail: intro/long tekstovi stižu nakon "update-a" brendova (polja su opciona, prikazuje se zamjenski tekst)
const copy: Record<string, Pick<Brand, 'intro' | 'long'>> = {
  MIPA: {
    intro: 'Njemački proizvođač boja i sistema za autoreparaturu i industrijske premaze.',
    long: 'Od 2011. godine Mega-Em je distributer njemačke kompanije Mipa za Bosnu i Hercegovinu. Mipa je jedan od naših najprepoznatljivijih brendova u oblasti autoreparaturnih materijala i industrijskih premaza.',
  },
}

export const brands: Brand[] = [
  ...partners.map((p) => ({ name: names[p.id] ?? p.id, logo: p.logo, ...copy[names[p.id]] })),
  { name: 'SIA' },
]

export const brandByName = (name: string | null) => (name ? brands.find((b) => b.name.toLowerCase() === name.toLowerCase()) : undefined)
