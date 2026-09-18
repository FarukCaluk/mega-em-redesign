export interface ContactPerson {
  name: string
  role: string
}

export interface Location {
  slug: string
  name: string
  kind: 'veleprodaja' | 'maloprodaja'
  address: string
  phone: string
  email: string
  hours: string[]
  delivery: boolean
  social: ('facebook' | 'instagram')[]
  team: ContactPerson[]
}

export const locations: Location[] = [
  {
    slug: 'veleprodaja',
    name: 'Veleprodaja Visoko',
    kind: 'veleprodaja',
    address: 'Industrijska zona Ozrakovići, 71300 Visoko',
    phone: '066/238-932',
    email: 'office@mega-em.com',
    hours: ['Pon–pet 08:00–16:00', 'Vikendom i praznicima ne radimo'],
    delivery: true,
    social: ['facebook'],
    team: [
      { name: '11 komercijalnih predstavnika', role: 'Pokrivaju regije Centar, Istok, Zapad, Jug, industriju i građevinsku hemiju' },
    ],
  },
  {
    slug: 'mega-color-visoko',
    name: 'Mega Color Visoko',
    kind: 'maloprodaja',
    address: 'Rešada Kadića bb, Visoko',
    phone: '063/047-063',
    email: 'megacolor.visoko@mega-em.com',
    hours: ['Pon–pet 08:00–17:00', 'Subota 08:00–16:00', 'Nedjeljom i praznicima ne radimo'],
    delivery: false,
    social: ['facebook', 'instagram'],
    team: [
      { name: 'Haris Šišić', role: 'Voditelj poslovnice' },
      { name: 'Haris Begić', role: 'Prodavač' },
      { name: 'Jasmin Karić', role: 'Prodavač' },
    ],
  },
  {
    slug: 'mega-color-sarajevo',
    name: 'Mega Color Sarajevo',
    kind: 'maloprodaja',
    address: 'Safeta Zajke 85a, Sarajevo',
    phone: '066/710-658',
    email: 'megacolor.sarajevo@mega-em.com',
    hours: ['Pon–pet 08:00–17:00', 'Subota 08:00–16:00', 'Nedjeljom i praznicima ne radimo'],
    delivery: false,
    social: ['facebook', 'instagram'],
    team: [
      { name: 'Saša Marjanović', role: 'Voditelj poslovnice' },
      { name: 'Almir Hodžić', role: 'Prodavač' },
    ],
  },
  {
    slug: 'mega-color-breza',
    name: 'Mega Color Breza',
    kind: 'maloprodaja',
    address: 'Alije Izetbegovića br. 100, Breza',
    phone: '063/397-784',
    email: 'megacolor.breza@mega-em.com',
    hours: ['Pon–pet 08:00–17:00', 'Subota 08:00–16:00', 'Nedjeljom i praznicima ne radimo'],
    delivery: true,
    social: ['facebook'],
    team: [
      { name: 'Dino Čučuk', role: 'Voditelj poslovnice' },
      { name: 'Semir Kamenjaš', role: 'Prodavač' },
    ],
  },
  {
    slug: 'mega-color-vitez',
    name: 'Mega Color Vitez',
    kind: 'maloprodaja',
    address: 'Stjepana Radića bb, Vitez',
    phone: '066/587-473',
    email: 'megacolor.vitez@mega-em.com',
    hours: ['Pon–pet 08:00–17:00', 'Subota 08:00–16:00', 'Nedjeljom i praznicima ne radimo'],
    delivery: true,
    social: ['facebook'],
    team: [
      { name: 'Zoran Voloder', role: 'Voditelj poslovnice' },
      { name: 'Mugdin Mujkić', role: 'Prodavač' },
    ],
  },
  {
    slug: 'mega-color-vares',
    name: 'Mega Color Vareš',
    kind: 'maloprodaja',
    address: 'Zvijezda br. 13, Vareš',
    phone: '066/238-932',
    email: 'megacolor.vares@mega-em.com',
    hours: ['Pon–pet 08:00–17:00', 'Subota 08:00–16:00', 'Nedjeljom i praznicima ne radimo'],
    delivery: true,
    social: ['facebook'],
    team: [{ name: 'Asmir Čizmo', role: 'Voditelj poslovnice' }],
  },
  {
    slug: 'mega-color-zenica',
    name: 'Mega Color Zenica',
    kind: 'maloprodaja',
    address: 'Mokušnice 1, Zenica',
    phone: '066/003-923',
    email: 'megacolor.zenica@mega-em.com',
    hours: ['Pon–pet 08:00–17:00', 'Subota 08:00–16:00', 'Nedjeljom i praznicima ne radimo'],
    delivery: false,
    social: ['facebook', 'instagram'],
    team: [
      { name: 'Zemir Eminović', role: 'Voditelj poslovnice' },
      { name: 'Belmin Livnjak', role: 'Prodavač' },
    ],
  },
]

export const retailLocations = locations.filter((l) => l.kind === 'maloprodaja')
export const wholesale = locations.find((l) => l.kind === 'veleprodaja')!
