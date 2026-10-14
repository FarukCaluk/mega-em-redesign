import { Briefcase, Mail, Phone, User, UserCheck, Paperclip } from 'lucide-react'
import Reveal from '../components/Reveal'
import PageIntro from '../components/PageIntro'
import Field from '../components/Field'
import FormCard from '../components/FormCard'

export default function Karijera() {
  return (
    <>
      <PageIntro
        eyebrow="Karijera"
        title="Pridružite se timu Mega-Em"
        description="Naša jedinstvenost, raznolikost i dinamika poslovanja zahtjeva stručne kadrove različitih profila te pruža priliku ambicioznim radnicima željnim znanja i uspjeha."
      />

      <section className="mx-auto max-w-2xl px-6 py-20">
        <Reveal>
          <FormCard
            title="Prijava za posao"
            icon={Briefcase}
            subject="Prijava za posao — Mega-Em"
            success="Hvala! Vaša prijava je poslana, javit ćemo vam se."
            submitLabel="Pošalji prijavu"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={User} name="Ime" required placeholder="Ime" />
              <Field icon={User} name="Prezime" required placeholder="Prezime" />
            </div>
            <Field icon={Mail} name="Email" type="email" required placeholder="Email" />
            <Field icon={Phone} name="Kontakt" required placeholder="Kontakt" />
            <Field icon={UserCheck} name="Pozicija" required placeholder="Pozicija na koju se prijavljujete" />
            <label className="block rounded-xl border border-dashed border-primary/30 bg-white p-4 text-sm text-muted">
              <span className="mb-2 flex items-center gap-2 font-medium text-ink"><Paperclip size={16} /> CV (PDF, DOC, DOCX — do 10 MB)</span>
              <input name="attachment" type="file" accept=".pdf,.doc,.docx" onChange={(e) => e.target.setCustomValidity((e.target.files?.[0]?.size ?? 0) > 10 * 1024 * 1024 ? 'CV mora biti manji od 10 MB' : '')} className="w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
            </label>
          </FormCard>
        </Reveal>
      </section>
    </>
  )
}
