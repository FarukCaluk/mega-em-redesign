import { useState, type FormEvent } from 'react'

// ponytail: privremeno sve ide na testni mail; za produkciju zamijeni adresom (npr. trening.centar@mega-em.com)
export const TEST_EMAIL = 'farukcaluk12@gmail.com'

// FormSubmit (formsubmit.co) šalje mail sa poljima i prilogom bez backenda; prvi upit traži aktivaciju putem maila
export function useFormSend(subject: string, to = TEST_EMAIL) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const file = fd.get('attachment')
    if (file instanceof File && file.size === 0) fd.delete('attachment')
    fd.append('_subject', subject)
    fd.append('_captcha', 'false')
    fd.append('_template', 'table')
    setStatus('sending')
    try {
      const r = await fetch(`https://formsubmit.co/ajax/${to}`, { method: 'POST', headers: { Accept: 'application/json' }, body: fd })
      const d = await r.json()
      const ok = r.ok && String(d.success) !== 'false'
      if (!ok) console.warn('FormSubmit:', d.message)
      setStatus(ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return { status, onSubmit }
}
