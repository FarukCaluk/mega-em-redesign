// (Sanity ne dozvoljava običnom korisničkom tokenu da postavi isDisabled, pa se webhook za vrijeme uvoza briše i poslije pravi iste postavke.)
// Masovni uvoz ne smije praviti stotine Vercel deployeva (besplatni plan ima limit od 100 deployeva dnevno za cijeli nalog).
// deployPaused(run): ukloni Sanity webhook(e) -> izvrši uvoz -> vrati ih nazad -> JEDNOM pozovi Vercel Deploy Hook.
//   NO_DEPLOY=1  uvoz bez ikakvog deploya na kraju (webhook se ipak vrati)
// URL Vercel Deploy Hooka: varijabla okoline VERCEL_DEPLOY_HOOK ili fajl studio/deploy-hook.local (jedan red, nije u gitu).
import {existsSync, readFileSync} from 'node:fs'
import {getCliClient} from 'sanity/cli'

const API = 'https://api.sanity.io/v2021-10-04/hooks/projects/'
export const hookUrl = () => process.env.VERCEL_DEPLOY_HOOK || (existsSync('deploy-hook.local') ? readFileSync('deploy-hook.local', 'utf8').trim() : '')
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function deployPaused(run: () => Promise<unknown>, opts: {skip?: boolean} = {}) {
  if (opts.skip) return run() // probni prolaz (DRY): ništa se ne upisuje, webhook se ne dira
  const {projectId, token} = getCliClient({apiVersion: '2025-01-01'}).config()
  const call = async (path: string, init?: RequestInit) => {
    const res = await fetch(API + projectId + path, {...init, headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}})
    if (!res.ok) throw new Error(`Sanity hooks API ${res.status}: ${await res.text()}`)
    return res.json()
  }
  type Hook = {id: string; name: string; url: string; dataset: string; isDisabled?: boolean; [k: string]: unknown}
  const paused: Hook[] = ((await call('')) as Hook[]).filter((h) => !h.isDisabled)
  for (const h of paused) await call(`/${h.id}`, {method: 'DELETE'})
  if (paused.length) console.log(`webhook uklonjen za vrijeme uvoza: ${paused.map((h) => h.name).join(', ')}`)
  else console.log('upozorenje: nema aktivnog Sanity webhooka (sajt se ne gradi sam od izmjena u Studiju)')

  try {
    await run()
  } finally {
    await sleep(5000) // da događaji iz zadnje transakcije prođu dok webhook još ne postoji
    for (const h of paused) {
      const keep = ['type', 'name', 'url', 'httpMethod', 'apiVersion', 'dataset', 'includeDrafts', 'includeAllVersions', 'rule', 'headers']
      const body = Object.fromEntries(keep.filter((k) => h[k] != null).map((k) => [k, h[k]]))
      await call('', {method: 'POST', body: JSON.stringify(body)}).catch((e) => console.error('NIJE vraćen webhook, pokrenite: npx sanity exec scripts/setup-webhook.ts --with-user-token', e.message))
    }
    if (paused.length) console.log('webhook ponovo napravljen')
  }

  const url = hookUrl()
  if (process.env.NO_DEPLOY === '1') console.log('NO_DEPLOY=1: deploy nije pokrenut')
  else if (!url) console.log('deploy nije pokrenut: nema VERCEL_DEPLOY_HOOK / studio/deploy-hook.local')
  else {
    const res = await fetch(url, {method: 'POST'})
    console.log(res.ok ? 'pokrenut tačno 1 Vercel deploy' : `Vercel Deploy Hook greška ${res.status}`)
  }
}
