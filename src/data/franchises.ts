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

const retailHours = ['Pon–pet 08:00–17:00', 'Subota 08:00–16:00']

// ponytail: adrese/kontakti za gradove bez podataka se dopunjuju naknadno (polja su opciona)
export const franchises: Franchise[] = [
  { slug: 'visoko', city: 'Visoko', name: 'Mega Color Visoko', address: 'Rešada Kadića bb, Visoko', phone: '063/047-063', email: 'megacolor.visoko@mega-em.com', hours: retailHours },
  { slug: 'sarajevo', city: 'Sarajevo', name: 'Mega Color Sarajevo', address: 'Safeta Zajke 85a, Sarajevo', phone: '066/710-658', email: 'megacolorsar@gmail.com', hours: ['Pon–pet 08:00–17:00', 'Sub 08:00–15:00', 'Nedjeljom ne radimo'], image: '/images/franchises/sarajevo.webp' },
  { slug: 'breza', city: 'Breza', name: 'Mega Color Breza', address: 'Alije Izetbegovića br. 100, Breza', phone: '061/090-560, 061/308-455', email: 'megacolor.breza@mega-em.com', hours: retailHours, image: '/images/franchises/breza.webp' },
  { slug: 'vitez', city: 'Vitez', name: 'Mega Color Vitez', address: 'Stjepana Radića bb, Vitez', phone: '063/897-013', email: 'megacolor.vitez@mega-em.com', hours: ['Radnim danima 08:00–16:30', 'Vikendom 08:00–16:00'], image: '/images/franchises/vitez.webp' },
  { slug: 'zenica', city: 'Zenica', name: 'Mega Color Zenica', address: 'Mokušnice 1, Zenica', phone: '066/003-923', email: 'megacolor.zenica@mega-em.com', hours: ['Radnim danima 08:00–16:00', 'Vikendom do 15:00'], image: '/images/franchises/zenica.webp' },
  { slug: 'gradacac', city: 'Gradačac', name: 'Gradačac' },
  { slug: 'banja-luka', city: 'Banja Luka', name: 'Banja Luka' },
  { slug: 'prijedor', city: 'Prijedor', name: 'Prijedor' },
  { slug: 'kozarska-dubica', city: 'Kozarska Dubica', name: 'Kozarska Dubica' },
  { slug: 'gradiska', city: 'Gradiška', name: 'Gradiška' },
  { slug: 'bijeljina', city: 'Bijeljina', name: 'Bijeljina' },
  { slug: 'cazin', city: 'Cazin', name: 'Mega Color Cazin', phone: '060/350-5091', email: 'megacolorcazin@gmail.com', hours: ['Pon–sub 08:00–17:00'], image: '/images/franchises/cazin.webp' },
  { slug: 'ljubuski', city: 'Ljubuški', name: 'Ljubuški' },
]
