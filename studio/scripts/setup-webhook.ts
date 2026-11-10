// Pravi (ili zamjenjuje) Sanity webhook koji poziva Vercel Deploy Hook kad klijent OBJAVI izmjenu u Studiju.
// Ne šalje se za draftove (autosave), pa jedna objava = jedan deploy.
// Pokretanje:  npx sanity exec scripts/setup-webhook.ts --with-user-token
//   URL Deploy Hooka se uzima iz VERCEL_DEPLOY_HOOK ili studio/deploy-hook.local (Vercel -> Settings -> Git -> Deploy Hooks)
//   HOOK_NAME=ime  mijenja naziv (podrazumijevano "Vercel deploy pri objavi")
import {getCliClient} from 'sanity/cli'
import {hookUrl} from './deploy'

const NAME = process.env.HOOK_NAME ?? 'Vercel deploy pri objavi'

async function run() {
  const url = hookUrl()
  if (!url) throw new Error('Nema URL-a: postavite VERCEL_DEPLOY_HOOK ili studio/deploy-hook.local')
  const {projectId, token, dataset} = getCliClient({apiVersion: '2025-01-01'}).config()
  const base = `https://api.sanity.io/v2021-10-04/hooks/projects/${projectId}`
  const call = async (path: string, init?: RequestInit) => {
    const res = await fetch(base + path, {...init, headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}})
    if (!res.ok) throw new Error(`Sanity hooks API ${res.status}: ${await res.text()}`)
    return res.status === 204 ? null : res.json()
  }
  const old: {id: string; name: string}[] = (await call('')).filter((h: {name: string}) => h.name === NAME)
  for (const h of old) await call(`/${h.id}`, {method: 'DELETE'})
  const created = await call('', {
    method: 'POST',
    body: JSON.stringify({
      type: 'document',
      name: NAME,
      url,
      httpMethod: 'POST',
      apiVersion: 'v2025-01-01',
      dataset,
      includeDrafts: false,
      includeAllVersions: false,
      isDisabled: false,
      rule: {on: ['create', 'update', 'delete'], filter: '!(_id in path("drafts.**"))', projection: '{_id}'},
    }),
  })
  console.log(`webhook "${NAME}" napravljen (id ${created.id}), zamijenjeno starih: ${old.length}`)
}
run().catch((e) => {
  console.error(e)
  process.exit(1)
})
