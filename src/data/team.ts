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

const m = (name: string, role: string, email?: string, phone?: string): TeamMember => ({ name, role, email, phone })
const d = (s: string) => `${s}@mega-em.com`

export const departments: Department[] = [
  {
    id: 'menadzment',
    label: 'Menadžment',
    members: [m('Adna Efendira', 'Generalni direktor'), m('Božana Puljić', 'Izvršni direktor'), m('Enver Efendira', 'Član uprave')],
  },
  {
    id: 'autoreparatura',
    label: 'Prodaja autoreparatura',
    members: [
      m('Nisad Džekić', 'Voditelj odjela', d('nisad.dzekic')),
      m('Ermin Ljevo', 'Prodajni predstavnik', d('ermin.lj'), '+387 65 016 326'),
      m('Dino Čučuk', 'Prodajni predstavnik', d('dino.cucuk'), '+387 61 240 219'),
      m('Mensur Ćatić', 'Prodajni predstavnik', d('mensur.catic'), '+387 66 385 541'),
      m('Mario Šodić', 'Prodajni predstavnik', d('marijo.sodic'), '+387 65 439 590'),
      m('Gorana Marković', 'Prodajni predstavnik', d('gorana.markovic'), '+387 63 047 063'),
      m('Haris Karalić', 'Prodajni predstavnik', d('haris.karalic'), '+387 65 014 907'),
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing i razvoj',
    members: [
      m('Nedžad Gazibera', 'Menadžer razvoja i marketinga', d('nedzad.g')),
      m('Predrag Vrhovac', 'Tehnička podrška', d('predrag.vrhovac')),
      m('Ermin Ljevo', 'Tehnička podrška', d('ermin.lj'), '+387 65 016 326'),
      m('Dino Čučuk', 'Tehnička podrška', d('dino.cucuk'), '+387 61 240 219'),
    ],
  },
  {
    id: 'metaloprerada',
    label: 'Metaloprerada',
    members: [
      m('Mladen Stanković', 'Prodajni predstavnik / Tehnička podrška', d('mladen.stankovic'), '+387 65 880 061'),
      m('Stefan Stanković', 'Prodajni predstavnik', d('stefan.stankovic'), '+387 66 473 024'),
    ],
  },
  {
    id: 'gradjevinska-hemija',
    label: 'Građevinska hemija',
    members: [m('Semin Kasper', 'Prodajni predstavnik', d('semin.kasper'), '+387 65 015 779'), m('Jadranko Barešić', 'Tehnolog', d('jadranko.baresic'))],
  },
  {
    id: 'nabava',
    label: 'Nabava',
    members: [
      m('Semin Kasper', 'Voditelj odjela', d('semin.kasper')),
      m('Melina Junuzović', 'Menadžer kategorije proizvoda', d('melina.junuzovic')),
      m('Berina Mušinbegović', 'Koordinator nabave', d('berina.musinbegovic')),
    ],
  },
  {
    id: 'skladiste',
    label: 'Skladište i logistika',
    members: [
      m('Elmir Pušćul', 'Voditelj odjela', d('elmir.puscul')),
      m('Edžnan Hodžić', 'Glavni skladištar'),
      m('Tarik Berbić', 'Skladištar'),
      m('Elvedin Mušinbegović', 'Skladištar'),
      m('Harun Bajrić', 'Operater za miješanje boje'),
      m('Kenan Brotlija', 'Vozač'),
      m('Mirsad Buko', 'Vozač'),
      m('Harun Omanović', 'Vozač'),
    ],
  },
  {
    id: 'finansije',
    label: 'Finansije',
    members: [
      m('Amel Turbo', 'Voditelj odjela', d('amel.turbo')),
      m('Fatima Čelebić', 'Finansijski knjigovođa', d('fatima.celebic')),
      m('Ramiz Mihaljević', 'Referent za fakturisanje', d('ramiz.mihaljevic')),
      m('Edita Omanović', 'Referent u finansijama', d('edita.omanovic'), '+387 62 723 376'),
    ],
  },
]
