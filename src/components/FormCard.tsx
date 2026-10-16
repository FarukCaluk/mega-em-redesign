import type { ReactNode } from 'react'
import { CheckCircle2, type LucideIcon } from 'lucide-react'
import { useFormSend, TEST_EMAIL } from '../lib/useFormSend'

// native: običan POST (potreban za priloge, FormSubmit ih ne prima preko AJAX-a); nakon slanja vraća na ?poslano=1
export default function FormCard({ title, icon: Icon, subject, success, submitLabel, native, children }: {
  title: string
  icon: LucideIcon
  subject: string
  success: string
  submitLabel: string
  native?: boolean
  children: ReactNode
}) {
  const { status, onSubmit } = useFormSend(subject)
  const done = native ? window.location.search.includes('poslano=1') : status === 'done'
  const formProps = native
    ? { action: `https://formsubmit.co/${TEST_EMAIL}`, method: 'POST', encType: 'multipart/form-data' }
    : { onSubmit }

  return (
    <div className="rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/[0.06] to-primary-light/[0.02] p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
          <Icon size={20} />
        </span>
        <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
      </div>

        {!done ? (
          <form {...formProps} className="animate-scale-in mt-7 space-y-4">
            {native && (
              <>
                <input type="hidden" name="_subject" value={subject} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value={`${window.location.origin}${window.location.pathname}?poslano=1`} />
              </>
            )}
            {children}
            {status === 'error' && (
              <p className="text-sm text-red-600">Slanje nije uspjelo. Pokušajte ponovo ili nam pišite na office@mega-em.com.</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-full bg-primary py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 active:translate-y-0 disabled:opacity-60"
            >
              {status === 'sending' ? 'Šaljem…' : submitLabel}
            </button>
          </form>
        ) : (
          <div className="animate-scale-in mt-7 flex flex-col items-center gap-4 rounded-2xl bg-white p-10 text-center ring-1 ring-black/5">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 size={30} />
            </span>
            <p className="text-lg font-semibold text-ink">{success}</p>
          </div>
        )}
    </div>
  )
}
