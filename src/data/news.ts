export interface NewsPost {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  image: string
  content: string[]
}

export const newsPosts: NewsPost[] = [
  {
    slug: 'otvoren-trening-centar',
    title: 'Otvorili smo MEGA-EM Trening centar za autoreparaturu',
    excerpt: 'Postali smo prva firma u BiH sa trening centrom za autoreparaturni program — prostor namijenjen edukaciji, praktičnim demonstracijama i usavršavanju zaposlenika, kupaca i poslovnih partnera.',
    date: '01.09.2026.',
    category: 'Kompanija',
    image: '/images/trening-centar/trening-centar-tim.png',
    content: [
      'Otvorili smo MEGA-EM Trening centar za autoreparaturu i time postali prva firma u BiH koja ima trening centar za autoreparaturni program.',
      'U MEGA-EM-u vjerujemo da kvalitetni proizvodi ostvaruju svoj puni potencijal tek kada ih prati kvalitetno znanje. Upravo zato smo otvorili naš Trening centar – mjesto namijenjeno edukaciji, usavršavanju i praktičnom radu.',
      'Kao vodeći distributer materijala za autoreparaturu želimo našim zaposlenicima, partnerima i kupcima pružiti mogućnost da na jednom mjestu stječu nova znanja i usavršavaju svoje vještine.',
      'U Trening centru održavat će se: stručne edukacije i radionice, praktične demonstracije i testiranja proizvoda, prezentacije novih tehnologija i proizvoda, te obuke za naše zaposlenike, kupce i poslovne partnere.',
      'Program edukacija obuhvatit će oblasti pripreme površina, lakiranja, poliranja, detailinga, primjene profesionalnih materijala, novih tehnologija i savremenih metoda rada koje se danas koriste u vodećim evropskim servisima i lakirnicama.',
      'Poseban segment rada centra bit će saradnja sa srednjim stručnim školama, obrazovnim ustanovama i mladim ljudima koji žele graditi karijeru u autoindustriji. Na taj način MEGA EM želi dati doprinos razvoju novih generacija stručnjaka i povezivanju obrazovanja s potrebama tržišta rada.',
      'Ovo je važan korak u daljnjem razvoju naše kompanije i ulaganje u ono što smatramo najvrjednijim – znanje, stručnost i kvalitetnu podršku našim kupcima.',
      'Hvala svima koji su svojim prisustvom uljepšali ovaj poseban dan. Veselimo se budućim edukacijama, razmjeni iskustava i zajedničkom napretku.',
    ],
  },
  {
    slug: 'edukacija-poliranje-vozila',
    title: 'Edukacija o profesionalnom poliranju i održavanju vozila',
    excerpt: 'Ugostili smo predstavnike ovlaštenih servisa REMEX (Tuzla), TRIAB (Sarajevo), BUNJO (Sarajevo) i Auto servis Omerčić (Gradačac) na praktičnoj radionici o poliranju i održavanju vozila u prodajnim salonima, uz proizvode Meguiar’s, Liquid Elements, ShineMate i Feral.',
    date: '20.09.2026.',
    category: 'Edukacija',
    image: '/images/trening-centar/trening-centar-gosti.webp',
    content: [
      'U našem trening centru održana je stručna edukacija posvećena profesionalnoj njezi vozila.',
      'Ugostili smo predstavnike ovlaštenih servisa REMEX d.o.o. Tuzla, TRIAB d.o.o. Sarajevo, BUNJO d.o.o. Sarajevo i AUTO SERVIS OMERČIĆ d.o.o. Gradačac.',
      'Tema edukacije bila je profesionalno poliranje i održavanje vozila u prodajnim salonima. Kroz praktičan rad pokazali smo kako pravilnim odabirom proizvoda i opreme ukloniti manje nepravilnosti na laku, vratiti vozilu sjaj i sačuvati njegov uredan izgled tokom boravka u salonu.',
      'Predstavili smo proizvode i opremu brendova Meguiar’s, Liquid Elements, ShineMate i Feral, a učesnici su imali priliku isprobati različita rješenja i razmijeniti iskustva iz svakodnevnog rada.',
      'Hvala našim partnerima na dolasku, odličnoj atmosferi i aktivnom učešću. Vjerujemo da su upravo ovakva druženja i razmjena znanja najbolji način da zajedno unapređujemo kvalitet usluge.',
      'Vidimo se na narednoj edukaciji!',
    ],
  },
  {
    slug: 'oglas-operater-mijesanja-boja',
    title: 'Zapošljavamo: Operater miješanja boja',
    excerpt: 'Zbog proširenja poslovanja tražimo operatera miješanja boja — rad na mašinama za toniranje, kontrola nijanse i pakovanje gotovih proizvoda. Prijave na office@mega-em.com.',
    date: '22.09.2026.',
    category: 'Karijera',
    image: '/images/news/oglas-operater-mijesanja-boja.webp',
    content: [
      'Zbog proširenja poslovanja, Mega EM d.o.o. Visoko raspisuje oglas za prijem radnika na poziciju: Operater miješanja boja.',
      'Opis posla: miješanje i toniranje boja prema zadatim recepturama, rad na mašinama i opremi za miješanje boja, kontrola kvaliteta i nijanse gotovog proizvoda, pravilno doziranje i rukovanje materijalima, pakovanje i priprema proizvoda za izdavanje, održavanje urednosti i čistoće radnog prostora, te poštivanje procedura i standarda rada.',
      'Poželjno: iskustvo na sličnim poslovima je prednost, odgovornost, preciznost i ozbiljan pristup radu, spremnost na timski rad, osnovno poznavanje rada na računaru, spremnost za učenje i usavršavanje.',
      'Mjesto rada: Visoko.',
      'Prijave: zainteresovani kandidati mogu poslati CV na office@mega-em.com ili se javiti direktno u Mega EM d.o.o. Visoko, Industrijska zona Ozrakovići bb.',
      'Postani dio našeg tima!',
    ],
  },
  {
    slug: 'novi-mipa-proizvodi',
    title: 'Novi MIPA proizvodi stigli u ponudu',
    excerpt: 'Proširili smo asortiman MIPA autoreparaturnih premaza i lakova — od brzih filera do HS akrilnih lakova najnovije generacije.',
    date: '02.09.2026.',
    category: 'Proizvodi',
    image: '/images/gallery/g11.jpg',
    content: [
      'Proširili smo asortiman MIPA autoreparaturnih premaza i lakova novim proizvodima iz kitova, filera i lakova.',
      'U ponudi su sada i brzi dvokomponentni fileri za ekonomičnu doradu bez potrebe za sušenjem u komori, kao i HS akrilni lakovi najnovije generacije sa poboljšanom otpornošću na mikro-ogrebotine.',
      'Kompletan pregled dostupnog asortimana pogledajte na stranici Proizvodi, gdje možete pretraživati i filtrirati po kategoriji i brendu.',
    ],
  },
  {
    slug: 'nova-poslovnica',
    title: 'Šest Mega Color poslovnica u središnjoj Bosni',
    excerpt: 'Mreža maloprodajnih objekata nastavlja rasti — pogledajte gdje se sve nalaze naše poslovnice i šta vas čeka u svakoj od njih.',
    date: '15.08.2026.',
    category: 'Kompanija',
    image: '/images/gallery/g20.jpg',
    content: [
      'Mreža Mega Color maloprodajnih objekata nastavlja rasti — danas brojimo šest poslovnica na teritoriji središnje Bosne: Visoko, Sarajevo, Breza, Vitez, Vareš i Zenica.',
      'Svaka poslovnica nudi širok asortiman boja, lakova i autoreparaturnih materijala, uz stručno osoblje spremno da pomogne pri odabiru pravog proizvoda za vaše potrebe.',
      'Pun pregled adresa, radnog vremena i kontakt informacija za svaku poslovnicu pronađite na stranici Poslovne jedinice.',
    ],
  },
  {
    slug: 'priprema-povrsine-savjeti',
    title: 'Savjeti: priprema površine prije lakiranja',
    excerpt: 'Pet koraka koje profesionalci nikad ne preskaču — od odmašćivanja do finalnog brušenja, prije nego što lak dođe na površinu.',
    date: '28.07.2026.',
    category: 'Savjeti',
    image: '/images/gallery/g27.jpg',
    content: [
      'Kvalitetan završni sloj laka počinje mnogo prije nego što se pištolj uopšte napuni bojom. Evo pet koraka koje profesionalci nikad ne preskaču.',
      '1. Odmašćivanje — uklonite masnoću, vosak i silikon sa cijele površine prije bilo kakvog brušenja, kako biste izbjegli "riblje oči" u završnom sloju.',
      '2. Grubo brušenje — uklonite staru boju, hrđu i nepravilnosti odgovarajućom granulacijom brusnog papira.',
      '3. Punjenje i fileri — koristite odgovarajući filer ili kit za popunjavanje udubljenja i izjednačavanje površine.',
      '4. Fino brušenje — postepeno smanjujte granulaciju brusnog papira kako biste dobili glatku, ujednačenu podlogu.',
      '5. Završno odmašćivanje i zaštita — posljednji put očistite površinu i zaštitite okolne dijelove prije nanošenja boje i laka.',
      'Preskakanje bilo kojeg od ovih koraka se gotovo uvijek vidi na završnom sjaju — strpljenje u pripremi je ono što razdvaja amatersku od profesionalne dorade.',
    ],
  },
]
