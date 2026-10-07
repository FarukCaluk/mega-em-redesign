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

const m = (name: string, role: string): TeamMember => ({ name, role })

// ponytail: email/phone se dodaju naknadno direktno u m(...) objekte (polja phone/email su podržana)
export const departments: Department[] = [
  {
    id: 'menadzment',
    label: 'Menadžment',
    members: [m('Adna Efendira', 'Generalni direktor'), m('Božana Puljić', 'Izvršni direktor'), m('Enver Efendira', 'Član uprave')],
  },
  {
    id: 'autoreparatura',
    label: 'Autoreparatura',
    members: [
      m('Nisad Džekić', 'Voditelj odjela'),
      m('Ermin Ljevo', 'Prodajni predstavnik / Tehnička podrška'),
      m('Dino Čučuk', 'Prodajni predstavnik / Tehnička podrška'),
      m('Mensur Ćatić', 'Prodajni predstavnik'),
      m('Mario Šodić', 'Prodajni predstavnik'),
      m('Gorana Marković', 'Prodajni predstavnik'),
      m('Haris Karalić', 'Prodajni predstavnik'),
      m('Nedžad Gazibera', 'Menadžer razvoja i marketinga'),
      m('Predrag Vrhovac', 'Tehnička podrška'),
    ],
  },
  {
    id: 'metaloprerada',
    label: 'Metaloprerada',
    members: [m('Mladen Stanković', 'Prodajni predstavnik / Tehnička podrška'), m('Stefan Stanković', 'Prodajni predstavnik')],
  },
  {
    id: 'gradjevinska-hemija',
    label: 'Građevinska hemija',
    members: [m('Semin Kasper', 'Prodajni predstavnik'), m('Jadranko Barešić', 'Tehnolog')],
  },
  {
    id: 'nabava',
    label: 'Nabava',
    members: [m('Semin Kasper', 'Voditelj odjela'), m('Melina Junuzović', 'Menadžer kategorije proizvoda'), m('Berina Mušinbegović', 'Koordinator nabave')],
  },
  {
    id: 'skladiste',
    label: 'Skladište i logistika',
    members: [
      m('Elmir Pušćul', 'Voditelj odjela'),
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
      m('Amel Turbo', 'Voditelj odjela'),
      m('Fatima Čelebić', 'Finansijski knjigovođa'),
      m('Ramiz Mihaljević', 'Referent za fakturisanje'),
      m('Edita Omanović', 'Referent u finansijama'),
    ],
  },
]
