// paint-chip accent palette — each card/tab picks one, echoing an actual color fan deck
export const swatches = ['#82099b', '#1FA9A0', '#E0A72E', '#D65D4A', '#2E6FB0', '#4C7A3D', '#B0356B']

export const partners = [
  '3m', '4cr', 'axalta', 'colorit', 'cromax', 'crs', 'draumet', 'dupont',
  'duxone', 'ega', 'faster', 'forester', 'gebol', 'higo', 'indasa', 'kromaks',
  'meguiars', 'mipa', 'protect2u', 'rupes', 'sagola', 'smirdex', 'trensar',
].map((id) => ({ id, logo: `/images/partners/${id}-logo.png` }))

export const stats = [
  { value: 7, suffix: '', label: 'Poslovnica' },
  { value: 30, suffix: '', label: 'Godina poslovanja' },
  { value: 30, suffix: '+', label: 'Partnera' },
  { value: 43, suffix: '+', label: 'Radnika' },
]

export const employeeGrowth = [
  { year: '1996.', count: 3 },
  { year: '2000.', count: 4 },
  { year: '2005.', count: 5 },
  { year: '2010.', count: 11 },
  { year: '2015.', count: 19 },
  { year: '2020.', count: 39 },
  { year: '2021.', count: 43 },
]

export const brandTimeline = [
  { year: '2000.', brands: 'CRH' },
  { year: '2012.', brands: 'MIPA, HENELIT, CALUCEM' },
  { year: '2012.', brands: 'SPIN – CROMAX, DUXON, 3M, WALCOM' },
  { year: '2012.', brands: 'LANXESS, GRAF, JELUWERK' },
  { year: '2012.', brands: 'VINK CHEMICAL, KENDA FARBEN' },
  { year: '2013.', brands: 'ASHLAND, BEROLAN, FACI' },
  { year: '2015.', brands: 'FAR, ALBERDINGK, TROY' },
  { year: '2015.', brands: 'CHEMCO, CARTOTECNICA' },
  { year: '2017.', brands: 'KRAUS, BOWI' },
  { year: '2017.', brands: 'EGA, SAGOLA' },
  { year: '2018.', brands: 'INTER S, BIRLESIKFIRCA, GEBOL' },
  { year: '2019.', brands: 'ATLAS TAPE' },
  { year: '2019.', brands: 'CRS, AKRIPOL' },
  { year: '2020.', brands: 'SIA' },
  { year: '2021.', brands: 'DENKIM, RUPES, IMIFABI' },
  { year: '2021.', brands: 'HEMPEL, MEGUIARS' },
  { year: '2021.', brands: 'NIMBASIA, ROWIS' },
]

export const productCategories = [
  { title: 'Autoreparatura i industrijski premazi', desc: 'MIPA boje za vozila i industrijski premazi za profesionalnu autoreparaturu.' },
  { title: 'Građevinska hemija', desc: 'Aditivi i sirovine za fasadne i građevinske sisteme, betonske galanterije.' },
  { title: 'Boje i lakovi', desc: 'Širok asortiman boja i lakova renomiranih svjetskih proizvođača.' },
  { title: 'Abrazivni materijali', desc: 'Brusni papiri i abrazivi za profesionalnu i industrijsku upotrebu.' },
  { title: 'Ručni i električni alat', desc: 'Alati za autoreparaturu, građevinarstvo i industriju.' },
  { title: 'Autodetajling oprema', desc: 'Meguiar’s i druga oprema za njegu i detaljno čišćenje vozila.' },
  { title: 'PUR pjene, silikoni, sprejevi', desc: 'Montažne pjene, silikoni i sprejevi za građevinarstvo i industriju.' },
]

export const catalogs = [
  { title: 'Katalog autoreparatura', href: 'https://mega-em.com/autoreparatura-katalog/' },
  { title: 'Katalog alata', href: 'https://mega-em.com/katalog-alata/' },
]

export const galleryImages = Array.from({ length: 36 }, (_, i) => `/images/gallery/g${i + 1}.jpg`)
