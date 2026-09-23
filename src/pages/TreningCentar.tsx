import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CalendarDays, CheckCircle2, GraduationCap, Mail, Phone, User } from 'lucide-react'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'

const inputClass = 'w-full rounded-xl border border-black/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary'

export default function TreningCentar() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', date: '' })
  const [submitted, setSubmitted] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageIntro
        eyebrow="Mega Color Training Center"
        title="Rezervišite termin obuke"
        description="Praktične radionice o pripremi površine, koloristici i tehnikama nanošenja MIPA sistema."
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal variant="left">
            <div className="h-full min-h-[300px] overflow-hidden rounded-3xl shadow-xl shadow-primary/10">
              <img
                src="/images/trening-centar/trening-centar-tim.png"
                alt="Otvorenje Mega-Em Trening Centra"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal variant="right">
            <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] to-primary-light/[0.02] p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
                  <GraduationCap size={20} />
                </span>
                <div>
                  <h2 className="font-display text-lg font-semibold text-ink">Prijava za termin</h2>
                  <p className="text-sm text-muted">Javljamo vam se mailom čim potvrdimo termin.</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    className="mt-7 space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="relative">
                        <User size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                        <input required placeholder="Ime" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className={inputClass} />
                      </div>
                      <div className="relative">
                        <User size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                        <input required placeholder="Prezime" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className={inputClass} />
                      </div>
                    </div>

                    <div className="relative">
                      <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                      <input required type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                    </div>

                    <div className="relative">
                      <Phone size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                      <input required placeholder="Broj telefona" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                    </div>

                    <div className="relative">
                      <CalendarDays size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                      <input required type="date" placeholder="Odabir datuma" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
                    </div>

                    <button type="submit" className="w-full rounded-full bg-primary py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
                      Pošalji rezervaciju
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
        </div>

        <Reveal className="mt-16">
          <h2 className="font-display text-xl font-semibold text-ink">Pogledaj kako izgleda naš Trening centar</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { src: '/images/trening-centar/trening-centar-ulaz.webp', alt: 'Ulaz u Mega-Em Trening centar' },
              { src: '/images/trening-centar/trening-centar-gosti.webp', alt: 'Gosti na otvorenju Trening centra' },
            ].map((img) => (
              <div key={img.src} className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  )
}
