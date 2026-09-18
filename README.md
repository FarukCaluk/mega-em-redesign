# Mega-Em — redizajn web stranice

Redizajn zvanične web stranice kompanije **Mega-Em d.o.o.** iz Visokog — distributera boja, lakova, autoreparaturnih materijala, industrijskih premaza i građevinske hemije u Bosni i Hercegovini od 1996. godine.

## Tehnologije

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** za stilizaciju
- **React Router v7** za rutiranje između stranica
- **Framer Motion** za animacije i mikro-interakcije
- **React Three Fiber** + **drei** + **Three.js** za 3D konfigurator boje na naslovnoj stranici

## Stranice

- **Početna** — hero sekcija sa interaktivnim 3D konfiguratorom automobila (rotacija mišem, promjena boje laka u realnom vremenu)
- **O nama** — historijat kompanije, rast tima kroz godine, brendovi kroz godine
- **Naš tim** — menadžment i pregled po odjelima (prodaja, tehnička podrška, maloprodaje, nabava, finansije, skladište, pravna služba)
- **Poslovne jedinice** — pregled veleprodaje i svih Mega Color maloprodajnih objekata, sa posvećenom stranicom po poslovnici (kontakt info + Google mapa)
- **Proizvodi** — kategorije proizvoda, katalozi za preuzimanje, zastupani brendovi
- **Galerija**
- **Kontakt** — forma za upit i lokacija na mapi

## Pokretanje projekta

```bash
npm install
npm run dev
```

Ostale komande:

```bash
npm run build     # produkcijski build (type-check + Vite build)
npm run preview   # lokalni pregled produkcijskog builda
npm run lint      # Oxlint
```

## Napomena o 3D modelu

3D model automobila korišten u konfiguratoru na naslovnoj stranici ("Car Concept") je generički, nebrendiran model dostupan pod **CC BY 4.0** licencom (© Darmstadt Graphics Group GmbH, Khronos glTF-Sample-Assets). Atribucija se nalazi u podnožju stranice.
