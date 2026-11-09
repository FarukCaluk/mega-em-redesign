# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open-source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## Uvoz podataka i Vercel deploy

Masovni uvoz ne smije pokrenuti stotine deployeva (Vercel besplatni plan: 100 deployeva dnevno za cijeli nalog).
Sve `scripts/import-*.ts` skripte same uklone Sanity webhook za vrijeme uvoza, vrate ga nazad i **jednom** pozovu Vercel Deploy Hook.

- Jednom: URL Vercel Deploy Hooka (Vercel -> Settings -> Git -> Deploy Hooks) upišite u `studio/deploy-hook.local` (jedan red, nije u gitu), pa `npx sanity exec scripts/setup-webhook.ts --with-user-token` pravi webhook za objave iz Studija (bez draftova).
- Uvoz: `npx sanity exec scripts/import-web.ts --with-user-token` (probni prolaz `DRY=1` ne dira ni webhook ni deploy).
- `NO_DEPLOY=1` isključuje završni deploy.
