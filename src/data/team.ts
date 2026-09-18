export interface TeamMember {
  name: string
  role: string
  phone?: string
  email?: string
}

export interface Department {
  id: string
  label: string
  members: TeamMember[]
}

export const management: TeamMember[] = [
  { name: 'Adna Efendira', role: 'Generalni direktor', email: 'adna.efendira@mega-em.com' },
  { name: 'Enver Efendira', role: 'Izvršni direktor', phone: '061/783-328', email: 'enver.efendira@mega-em.com' },
  { name: 'Dino Omerbegović', role: 'Komercijalni direktor', phone: '065/140-381', email: 'dino.omerbegovic@mega-em.com' },
  { name: 'Nedžad Gazibera', role: 'Menadžer kategorija proizvoda', phone: '061/861-095', email: 'nedzad.g@mega-em.com' },
  { name: 'Emir Čaluk', role: 'Operativni voditelj', phone: '062/803-438', email: 'emir.caluk@mega-em.com' },
]

export const departments: Department[] = [
  {
    id: 'prodaja',
    label: 'Prodaja',
    members: [
      { name: 'Amel Turbo', role: 'Voditelj maloprodaja', phone: '065/786-895', email: 'amel.turbo@mega-em.com' },
      { name: 'Nedžmina Efendira', role: 'Komercijalni predstavnik', phone: '061/783-287', email: 'nedzmina.e@mega-em.com' },
      { name: 'Ena Čaušević', role: 'Komercijalni predstavnik', phone: '065/016-326', email: 'ena.causevic@mega-em.com' },
      { name: 'Mladen Stanković', role: 'Komercijalni predstavnik', phone: '065/880-061', email: 'mladen.stankovic@mega-em.com' },
      { name: 'Haris Smajlović', role: 'Komercijalni predstavnik', phone: '066/385-541', email: 'haris.smajlović@mega-em.com' },
      { name: 'Hido Sadat', role: 'Komercijalni predstavnik', phone: '062/798-270', email: 'sadat.hido@mega-em.com' },
      { name: 'Haris Karalić', role: 'Komercijalni predstavnik', phone: '065/014-907', email: 'haris.karalic@mega-em.com' },
    ],
  },
  {
    id: 'tehnicka',
    label: 'Tehnička podrška',
    members: [
      { name: 'Nihad Agić', role: 'Tehnička podrška za autoreparaturu', phone: '065/003-485', email: 'nihad.agic@mega-em.com' },
      { name: 'Ismir Bičević', role: 'Kolorista', phone: '066/004-018', email: 'ismir.bicevic@mega-em.com' },
      { name: 'Jadranko Barešić', role: 'Tehnička podrška za građevinsku hemiju', email: 'jadranko.baresic@mega-em.com' },
    ],
  },
  {
    id: 'maloprodaje',
    label: 'Maloprodaje',
    members: [
      { name: 'Haris Šišić', role: 'Voditelj poslovnice — Visoko', phone: '063/047-063', email: 'haris.sisic@mega-em.com' },
      { name: 'Saša Marjanović', role: 'Voditelj poslovnice — Sarajevo', phone: '066/710-658', email: 'sasa.marjanovic@mega-em.com' },
      { name: 'Asmir Čizmo', role: 'Voditelj poslovnice — Vareš', phone: '066/238-932', email: 'asmir.cizmo@mega-em.com' },
      { name: 'Zoran Voloder', role: 'Voditelj poslovnice — Vitez', phone: '066/587-473', email: 'zoran.voloder@mega-em.com' },
      { name: 'Zemir Eminović', role: 'Voditelj poslovnice — Zenica', phone: '066/003-923', email: 'zemir.eminovic@mega-em.com' },
      { name: 'Dino Čučuk', role: 'Voditelj poslovnice — Breza', phone: '063/397-784', email: 'dino.cucuk@mega-em.com' },
      { name: 'Haris Begić', role: 'Prodavač u maloprodaji', email: 'haris.begic@mega-em.com' },
      { name: 'Semir Kamenjaš', role: 'Prodavač u maloprodaji', phone: '066/272-122', email: 'semir.kamenjas@mega-em.com' },
      { name: 'Jasmin Karić', role: 'Prodavač u maloprodaji', email: 'jasmin.karic@mega-em.com' },
      { name: 'Almir Hodžić', role: 'Prodavač u maloprodaji', email: 'almir.hodzic@mega-em.com' },
      { name: 'Belmin Livnjak', role: 'Prodavač u maloprodaji', email: 'belmin.livnjak@mega-em.com' },
      { name: 'Mugdin Mujkić', role: 'Prodavač u maloprodaji', email: 'mugdin.mujkic@mega-em.com' },
    ],
  },
  {
    id: 'nabava',
    label: 'Nabava',
    members: [
      { name: 'Božana Puljić', role: 'Voditelj nabave', phone: '063/047-066', email: 'bozana.puljic@mega-em.com' },
      { name: 'Melina Junuzović', role: 'Saradnik u službi nabave', phone: '065/670-217', email: 'melina.junuzovic@mega-em.com' },
    ],
  },
  {
    id: 'finansije',
    label: 'Finansije',
    members: [
      { name: 'Amra Lepić', role: 'Voditelj finansija', email: 'amra.lepic@mega-trans.ba' },
      { name: 'Amila Muslić', role: 'Saradnik u službi finansija', email: 'amila.muslic@mega-trans.ba' },
      { name: 'Fatima Čelebić', role: 'Saradnik finansija', phone: '065/874-544', email: 'fatima.celebic@mega-em.com' },
    ],
  },
  {
    id: 'skladiste',
    label: 'Skladište i logistika',
    members: [
      { name: 'Elmir Pušćul', role: 'Voditelj skladišta i logistike', phone: '066/661-509', email: 'elmir.puscul@mega-em.com' },
      { name: 'Ramiz Mihaljević', role: 'Skladištar', email: 'ramiz.mihaljevic@mega-em.com' },
      { name: 'Edžnan Hodžić', role: 'Zamjenik šefa skladišta', phone: '065/009-362', email: 'edznan.hodzic@mega-em.com' },
      { name: 'Kenan Hodžić', role: 'Skladištar', email: 'kenan.hodzic@mega-em.com' },
      { name: 'Mirnas Haračić', role: 'Skladištar', phone: '066/587-208', email: 'mirnas.haracic@mega-em.com' },
      { name: 'Harun Omanović', role: 'Skladištar', phone: '066/078-733', email: 'harun.omanovic@mega-em.com' },
      { name: 'Kenan Brotlija', role: 'Vozač', phone: '065/794-114', email: 'kenan.brotlija@mega-em.com' },
      { name: 'Mirsad Buko', role: 'Vozač', phone: '066/584-906', email: 'mirsad.buko@mega-em.com' },
    ],
  },
  {
    id: 'pravna',
    label: 'Pravna služba',
    members: [{ name: 'Ejub Zahirović', role: 'Pravna služba', phone: '065/016-007', email: 'ejub.zahirovic@mega-em.com' }],
  },
]
