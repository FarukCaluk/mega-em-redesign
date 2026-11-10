# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## Sadržaj, uvoz i Vercel deploy

Sajt pri otvaranju povlači sadržaj uživo iz Sanityja (`src/data/live.ts`, Sanity CDN), pa izmjene iz Studija i uvozi stižu na sajt **bez deploya**.
Ugrađeni `src/data/generated/content.json` (puni ga `npm run content` / build) je samo rezerva ako Sanity ne odgovori.

- **CORS:** domena sajta mora biti dodana u Sanity (`npx sanity cors add https://domena --no-credentials`). Trenutno: mega-em-redesign.vercel.app i localhost. Ako se doda nova domena (npr. mega-em.com), dodati i nju, inače sajt tiho koristi staru rezervu.
- **Uvoz:** `npx sanity exec scripts/import-web.ts --with-user-token` (`DRY=1` probni prolaz). Podrazumijevano **samo dodaje nove artikle** (postojeće, ručno dodane, slike i opise ne dira). `MODE=replace` je potpuna zamjena kataloga i briše/prepisuje; koristiti samo svjesno, uz prethodni backup (`npx sanity dataset export production backup.tar.gz`). Skripte same uklone webhook za vrijeme uvoza, pa nema deployeva. `DEPLOY=1` na kraju jednom pozove Vercel Deploy Hook (URL u `studio/deploy-hook.local` ili VERCEL_DEPLOY_HOOK).
- **Webhook za deploy** (`scripts/setup-webhook.ts`) više nije potreban jer se sadržaj ne ugrađuje u build. Nemojte ga praviti bez debounce-a (svaka objava = jedan deploy, Vercel besplatni plan ima limit od 100 deployeva dnevno za cijeli nalog).
- Opis proizvoda (polje "Opis proizvoda") prikazuje se na stranici artikla ispod slike i podataka.
