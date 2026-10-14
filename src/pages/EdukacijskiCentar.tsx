import { GraduationCap, Mail, Phone, User, Users, BookOpen } from 'lucide-react'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import Field, { inputClass } from '../components/Field'
import FormCard from '../components/FormCard'

const courses = ['Priprema površine', 'Lakiranje', 'Koloristika', 'Poliranje']

// ponytail: dodaj slike u ovaj niz kako prezentacije budu gotove
const photos = [
  { src: '/images/trening-centar/trening-centar-ulaz.webp', alt: 'Ulaz u Mega-Em edukacijski centar' },
  { src: '/images/trening-centar/trening-centar-gosti.webp', alt: 'Gosti na otvorenju edukacijskog centra' },
]

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
          {/* ponytail: uvodne rečenice o edukacijskom centru stižu od klijenta */}
          <p className="text-muted">Ovdje dolazi nekoliko uvodnih rečenica o edukacijskom centru Mega-Em.</p>
        </Reveal>

        <Reveal className="mt-10">
          <div className="mx-auto aspect-[16/7] max-w-4xl overflow-hidden rounded-3xl shadow-xl shadow-primary/10">
            <img loading="lazy" decoding="async" src="/images/trening-centar/trening-centar-tim.png" alt="Mega-Em edukacijski centar" className="h-full w-full object-cover" />
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-14 max-w-2xl">
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

        <Reveal className="mt-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((img) => (
              <div key={img.src} className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img loading="lazy" decoding="async" src={img.src} alt={img.alt} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  )
}
