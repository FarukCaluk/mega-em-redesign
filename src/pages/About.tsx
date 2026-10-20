import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'

const paragraphs = [
  'Kompanija Mega-Em d.o.o. Visoko osnovana je u februaru 1996. godine, kada su supružnici Adna i Mugdim Efendira pokrenuli poslovanje sa osnovnom djelatnošću trgovine građevinskim materijalom na veliko.',
  'Već 1998. godine kompanija ostvaruje značajan poslovni iskorak dobivanjem zastupništva za Bosnu i Hercegovinu za bijeli cement kompanije Holcim, danas CRH. Paralelno sa razvojem ovog segmenta, Mega-Em postepeno uvodi druge sirovine i aditive, kontinuirano proširujući i upotpunjujući svoj portfolio kako bi svojim kupcima ponudili sveobuhvatna rješenja i odgovorili na njihove rastuće potrebe. Zahvaljujući dugogodišnjem iskustvu, stručnosti i kontinuiranom razvoju, Mega-Em je danas jedan od vodećih distributera sirovina i aditiva u Bosni i Hercegovini za proizvodnju fasadnih sistema i građevinskih materijala.',
  'Godine 2009. Mega-Em širi svoje poslovanje na segment maloprodaje otvaranjem prve poslovnice „Mega Color“ u Visokom, specijalizirane trgovine za prodaju boja, lakova i autoreparaturnih materijala. Kontinuiranim razvojem i širenjem poslovne mreže, Mega-Em danas svoju prisutnost na tržištu dodatno jača kroz 10 franšiznih partnera širom Bosne i Hercegovine, omogućavajući kupcima dostupnost kvalitetnog asortimana i stručne podrške na različitim lokacijama.',
  'Godine 2011. kompanija započinje partnerstvo sa njemačkom kompanijom Mipa na distribuciji proizvoda na teritoriji Bosne i Hercegovine, čime otvara novi poslovni segment u oblasti autoreparaturnih materijala i industrijskih premaza. Razvojem ovog segmenta, Mega-Em kontinuirano obogaćuje svoju ponudu renomiranim svjetskim brendovima, pratećim potrošnim materijalom, mašinama i opremom, s ciljem da profesionalnim autolakirerima i radionicama ponudi kompletna rješenja za pripremu, popravku i lakiranje vozila.',
  'Godine 2025. Mega-Em ostvaruje još jedan značajan poslovni iskorak postajući zastupnik renomiranog svjetskog brenda PPG za Bosnu i Hercegovinu. Ovim partnerstvom dodatno širimo i unapređujemo ponudu u premium segmentu autolakirerskih materijala i profesionalnih rješenja.',
  'Mega-Em svojim partnerima pruža tehničku podršku, savjetovanje i pomoć pri odabiru i primjeni proizvoda. Od 2026. godine, dodatnu vrijednost našoj ponudi predstavlja i Trening centar Mega-Em, namijenjen stručnom usavršavanju, edukaciji i praktičnoj obuci. Centar je otvoren kako za naše postojeće partnere i kupce, tako i za nove generacije stručnjaka, pružajući im mogućnost da kroz teorijska znanja i praktičan rad unaprijede svoje vještine i upoznaju se sa savremenim rješenjima i tehnologijama u našim poslovnim segmentima.',
]

export default function About() {
  return (
    <>
      <PageIntro eyebrow="O nama" title="Historijat kompanije" />

      <section className="mx-auto max-w-3xl px-6 py-16">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={Math.min(i * 40, 160)} variant={i % 2 ? 'right' : 'left'}>
            <p className={`leading-relaxed ${i === 0 ? 'text-lg text-ink/80' : 'mt-5 text-muted'}`}>{p}</p>
          </Reveal>
        ))}
      </section>

      <section className="py-16 text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold text-ink">Upoznajte ljude iza Mega-Em</h2>
          <Link to="/nas-tim" className="mt-5 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25">
            Naš tim
          </Link>
        </Reveal>
      </section>
    </>
  )
}
