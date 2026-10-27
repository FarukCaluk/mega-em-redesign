import { GraduationCap, Mail, Phone, User, Users, BookOpen, Wrench, Presentation, Cpu } from 'lucide-react'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import Field, { inputClass } from '../components/Field'
import FormCard from '../components/FormCard'
import content from '../data/generated/content.json'

const courses = ['Priprema površine', 'Lakiranje', 'Koloristika', 'Poliranje']

const highlights = [
  { icon: Wrench, title: 'Stručno vođene edukacije', text: 'Znanje od ljudi koji se ovim poslom bave svaki dan.' },
  { icon: Presentation, title: 'Praktične demonstracije', text: 'Rad uživo, korak po korak, na stvarnim primjerima.' },
  { icon: Cpu, title: 'Savremena oprema', text: 'Nove tehnologije i alati dostupni polaznicima.' },
]

// fotografije dolaze iz Sanity CMS-a (Fotografije edukacijskog centra)
const photos = content.education

export default function EdukacijskiCentar() {
  return (
    <>
      <PageIntro
        eyebrow="Edukacijski centar"
        title="Rezervišite termin za edukaciju"
        description="„Praktične radionice vezane za pripremu površine, koloristiku, tehnike lakiranja i detailing“"
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Znanje, praksa i profesionalni razvoj na jednom mjestu</h2>
          <p className="mt-5 leading-relaxed text-muted">
            Edukacijski centar Mega-Em osmišljen je kao mjesto za usavršavanje znanja i praktičnih vještina u oblasti autoreparature, lakiranja i profesionalnog održavanja vozila.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Kroz stručno vođene edukacije, praktične demonstracije i rad sa savremenom opremom, polaznicima pružamo priliku da unaprijede postojeće vještine, upoznaju nove tehnologije i steknu znanja primjenjiva u svakodnevnom radu.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 80} className="h-full">
              <div className="h-full rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] to-primary-light/[0.02] p-6 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
                  <h.icon size={22} />
                </span>
                <h3 className="mt-4 font-display font-semibold text-ink">{h.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-6 max-w-3xl">
          <p className="rounded-2xl bg-surface px-6 py-4 text-center text-sm text-muted ring-1 ring-black/5">
            Edukacije su prilagođene kako početnicima koji žele steći osnovna znanja, tako i profesionalcima koji žele dodatno unaprijediti svoje vještine i radne procese.
          </p>
        </Reveal>

        <Reveal className="mx-auto mt-16 max-w-2xl">
          <p className="mb-6 text-center font-display text-lg font-semibold text-ink">
            Rezervišite svoj termin i investirajte u znanje koje donosi rezultate.
          </p>
          <FormCard
            title="Popunite formular"
            icon={GraduationCap}
            subject="Upit za edukaciju — Mega-Em"
            success="Bićete obaviješteni putem maila da li vam je primljena rezervacija."
            submitLabel="Pošalji upit"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={User} name="Ime" required placeholder="Ime" />
              <Field icon={User} name="Prezime" required placeholder="Prezime" />
            </div>
            <Field icon={Mail} name="Email" type="email" required placeholder="Email" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={Phone} name="Kontakt" required placeholder="Kontakt" />
              <Field icon={Users} name="Broj učesnika" type="number" min={1} required placeholder="Broj učesnika" />
            </div>
            <div className="relative">
              <BookOpen size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <select name="Edukacija" required defaultValue="" className={`${inputClass} appearance-none`}>
                <option value="" disabled>Odaberite edukaciju</option>
                {courses.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <textarea name="Opis" rows={4} placeholder="Opis" className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary" />
          </FormCard>
        </Reveal>
      </section>

      {/* fotografije se vrte u petlji; pauza na hover */}
      <section className="overflow-hidden pb-24 [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-4 pr-4 hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[...photos, ...photos].map((img, i) => (
            <img
              key={i}
              loading="lazy"
              decoding="async"
              src={img.src}
              alt={i < photos.length ? img.alt : ''}
              aria-hidden={i >= photos.length}
              width={480}
              height={300}
              className="h-56 w-[19rem] shrink-0 rounded-2xl object-cover sm:h-64 sm:w-[24rem]"
            />
          ))}
        </div>
      </section>
    </>
  )
}
