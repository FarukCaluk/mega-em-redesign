import { useState, type FormEvent } from 'react'
import { Phone, Mail, MapPin, Send, Briefcase, Check } from 'lucide-react'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import { swatches } from '../data/content'

const reasons = ['Upit o proizvodima', 'Saradnja', 'Reklamacija', 'Ostalo']

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', reason: reasons[0], message: '' })
  const [sent, setSent] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    const body = `Ime: ${form.name}\nEmail: ${form.email}\nRazlog: ${form.reason}\n\n${form.message}`
    window.location.href = `mailto:office@mega-em.com?subject=${encodeURIComponent(form.reason)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <PageIntro
        eyebrow="Kontakt"
        title="Kontaktirajte nas"
        description="Ukoliko imate bilo kakav upit, komentar ili sugestiju, javite nam se — potrudit ćemo se odgovoriti što je prije moguće."
      />

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={submit} className="animate-fade-up min-w-0 space-y-5 rounded-2xl border border-black/5 p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <input required placeholder="Ime i prezime" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-primary" />
            <input required type="email" placeholder="E-mail adresa" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-primary" />
          </div>
          <select value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}
            className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-primary">
            {reasons.map((r) => <option key={r}>{r}</option>)}
          </select>
          <textarea required placeholder="Poruka" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-xl border border-black/10 px-4 py-3 outline-none focus:border-primary" />
          <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:translate-y-0">
            Pošalji poruku <Send size={16} />
          </button>
          {sent && (
            <p className="animate-fade-up flex items-center gap-2 text-sm font-medium text-primary">
              <Check size={16} /> Otvoren je vaš email klijent — samo pošaljite poruku.
            </p>
          )}
        </form>

        <Reveal delay={120} className="min-w-0 space-y-6">
          <div className="space-y-4 rounded-2xl bg-surface p-6">
            <div className="flex gap-3"><MapPin className="shrink-0" style={{ color: swatches[0] }} /><span>Industrijska zona Ozrakovići bb, 71300 Visoko, Bosna i Hercegovina</span></div>
            <div className="flex gap-3"><Phone className="shrink-0" style={{ color: swatches[1] }} /><a href="tel:+38732460129" className="hover:underline">+387 (0)32 460 129</a></div>
            <div className="flex gap-3"><Mail className="shrink-0" style={{ color: swatches[4] }} /><a href="mailto:office@mega-em.com" className="hover:underline">office@mega-em.com</a></div>
          </div>
          <iframe
            title="Lokacija Mega-Em"
            className="h-64 w-full rounded-2xl border-0"
            loading="lazy"
            src="https://www.google.com/maps?q=Industrijska+zona+Ozrakovi%C4%87i,+Visoko&output=embed"
          />
        </Reveal>
      </section>

      <section className="grain bg-deep py-16 text-white">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <Briefcase className="mx-auto text-primary-light" size={32} />
          <h2 className="mt-4 font-display text-2xl font-semibold">Karijera</h2>
          <p className="mt-3 text-white/60">
            Naša jedinstvenost, raznolikost i dinamika poslovanja zahtjeva stručne kadrove različitih
            profila te pruža priliku ambicioznim radnicima željnim znanja i uspjeha. Mi slušamo vaše ideje!
          </p>
          <a href="mailto:office@mega-em.com?subject=Prijava%20za%20posao" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/25">
            Pošalji biografiju <Send size={16} />
          </a>
        </Reveal>
      </section>
    </>
  )
}
