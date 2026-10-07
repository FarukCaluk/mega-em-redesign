import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, GraduationCap, Mail, Phone, User, Users, BookOpen } from 'lucide-react'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'

const inputClass = 'w-full rounded-xl border border-black/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary'
const iconClass = 'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted'
const TARGET = 'trening.centar@mega-em.com'
const courses = ['Priprema površine', 'Lakiranje', 'Koloristika', 'Poliranje']

// ponytail: dodaj slike u ovaj niz kako prezentacije budu gotove
const photos = [
  { src: '/images/trening-centar/trening-centar-ulaz.webp', alt: 'Ulaz u Mega-Em edukacijski centar' },
  { src: '/images/trening-centar/trening-centar-gosti.webp', alt: 'Gosti na otvorenju edukacijskog centra' },
]

const empty = { firstName: '', lastName: '', email: '', phone: '', participants: '', course: '', description: '' }

export default function EdukacijskiCentar() {
  const [form, setForm] = useState(empty)
  const [submitted, setSubmitted] = useState(false)
  const set = (k: keyof typeof empty) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value })

  function submit(e: FormEvent) {
    e.preventDefault()
    const body = [
      `Ime: ${form.firstName}`,
      `Prezime: ${form.lastName}`,
      `Email: ${form.email}`,
      `Kontakt: ${form.phone}`,
      `Broj učesnika: ${form.participants}`,
      `Edukacija: ${form.course}`,
      '',
      form.description,
    ].join('\n')
    window.location.href = `mailto:${TARGET}?subject=${encodeURIComponent(`Upit za edukaciju: ${form.course}`)}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }

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
          <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] to-primary-light/[0.02] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                <GraduationCap size={20} />
              </span>
              <h2 className="font-display text-lg font-semibold text-ink">Popunite formular</h2>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} className="mt-7 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative">
                      <User size={16} className={iconClass} />
                      <input required placeholder="Ime" value={form.firstName} onChange={set('firstName')} className={inputClass} />
                    </div>
                    <div className="relative">
                      <User size={16} className={iconClass} />
                      <input required placeholder="Prezime" value={form.lastName} onChange={set('lastName')} className={inputClass} />
                    </div>
                  </div>
                  <div className="relative">
                    <Mail size={16} className={iconClass} />
                    <input required type="email" placeholder="Email" value={form.email} onChange={set('email')} className={inputClass} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="relative">
                      <Phone size={16} className={iconClass} />
                      <input required placeholder="Kontakt" value={form.phone} onChange={set('phone')} className={inputClass} />
                    </div>
                    <div className="relative">
                      <Users size={16} className={iconClass} />
                      <input required type="number" min={1} placeholder="Broj učesnika" value={form.participants} onChange={set('participants')} className={inputClass} />
                    </div>
                  </div>
                  <div className="relative">
                    <BookOpen size={16} className={iconClass} />
                    <select required value={form.course} onChange={set('course')} className={`${inputClass} appearance-none ${form.course ? '' : 'text-muted'}`}>
                      <option value="" disabled>Odaberite edukaciju</option>
                      {courses.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <textarea rows={4} placeholder="Opis" value={form.description} onChange={set('description')} className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary" />
                  <button type="submit" className="w-full rounded-full bg-primary py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
                    Pošalji upit
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-7 flex flex-col items-center gap-4 rounded-2xl bg-white p-10 text-center ring-1 ring-black/5"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 size={30} />
                  </span>
                  <p className="text-lg font-semibold text-ink">Bićete obaviješteni putem maila da li vam je primljena rezervacija.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
