import {defineArrayMember, defineField, defineType} from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Proizvod',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Naziv Mega-Em', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Adresa na sajtu (slug)',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      description: 'Automatski se napravi iz naziva. Mijenjajte samo ako je potrebno.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sku',
      title: 'Šifra Mega-Em',
      type: 'string',
      description: 'Svaki proizvod mora imati svoju šifru: već zauzeta šifra se ne može objaviti.',
      // ista šifra (bez obzira na velika/mala slova i razmake) ne smije biti na dva proizvoda, ni objavljena ni u nacrtu
      validation: (r) =>
        r.custom(async (value, context) => {
          const sku = value?.trim().toLowerCase()
          if (!sku) return true
          const id = context.document?._id.replace(/^drafts\./, '') ?? ''
          const other: {name?: string} | null = await context
            .getClient({apiVersion: '2025-01-01'})
            .withConfig({perspective: 'raw'})
            .fetch('*[_type == "product" && lower(sku) == $sku && !(_id in [$id, "drafts." + $id]) && !(_id in path("versions.**"))][0]{name}', {sku, id})
          return other ? `Šifra "${value?.trim()}" već postoji na proizvodu: ${other.name ?? '(bez naziva)'}` : true
        }),
    }),
    defineField({
      name: 'brand',
      title: 'Brend',
      type: 'reference',
      to: [{type: 'brand'}],
      description: 'Izaberite sa liste. Novi brend dodajte preko "Create new" (neće se pojaviti na stranici Brendovi dok ne uključite tu opciju na brendu).',
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Izaberite sa liste. Ako kategorija ne postoji, kliknite "Create new" i dodajte je.',
    }),
    defineField({
      name: 'subcategory',
      title: 'Podkategorija',
      type: 'reference',
      to: [{type: 'subcategory'}],
      description: 'Prikazuju se samo podkategorije izabrane kategorije. Nova se dodaje preko "Create new".',
      options: {
        filter: ({document}) => ({
          filter: 'category._ref == $cat',
          params: {cat: (document.category as {_ref?: string} | undefined)?._ref ?? ''},
        }),
      },
    }),
    defineField({
      name: 'tertiaryCategory',
      title: 'Tercijarna kategorija',
      type: 'reference',
      to: [{type: 'tertiaryCategory'}],
      description: 'Neobavezno. Prikazuju se samo tercijarne kategorije izabrane podkategorije.',
      options: {
        filter: ({document}) => ({
          filter: 'subcategory._ref == $sub',
          params: {sub: (document.subcategory as {_ref?: string} | undefined)?._ref ?? ''},
        }),
      },
    }),
    defineField({
      name: 'hidden',
      title: 'Sakriveno na sajtu',
      type: 'boolean',
      description: 'Uključeno = proizvod se ne prikazuje u katalogu. Isključite kad popunite brend, kategoriju i opis.',
      initialValue: false,
    }),
    defineField({
      name: 'newInOffer',
      title: 'Novo u ponudi',
      type: 'boolean',
      description: 'Uključeno = na kartici proizvoda u katalogu (u uglu slike) i na stranici artikla pojavljuje se oznaka "Novo u ponudi".',
      initialValue: false,
    }),
    defineField({name: 'supplierName', title: 'Naziv dobavljača', type: 'string'}),
    defineField({name: 'supplierCode', title: 'Šifra dobavljača', type: 'string'}),
    defineField({name: 'manufacturer', title: 'Proizvođač', type: 'string'}),
    defineField({name: 'image', title: 'Slika', type: 'image', options: {hotspot: true}}),
    defineField({name: 'intro', title: 'Uvodna rečenica (prikazuje se na kartici)', type: 'string'}),
    defineField({
      name: 'description',
      title: 'Opis proizvoda',
      type: 'text',
      rows: 10,
      description: 'Prikazuje se na stranici artikla ispod slike i podataka. Novi red u tekstu ostaje novi red na sajtu.',
    }),
    defineField({
      name: 'variants',
      title: 'Varijante (npr. veličine, RAL nijanse)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'variant',
          title: 'Varijanta',
          fields: [
            defineField({name: 'name', title: 'Naziv', type: 'string', validation: (r) => r.required()}),
            defineField({name: 'pack', title: 'Broj komada u paketu', type: 'string'}),
            defineField({name: 'code', title: 'Online šifra', type: 'string'}),
            defineField({name: 'supplierCode', title: 'Šifra dobavljača', type: 'string'}),
          ],
          preview: {select: {title: 'name', subtitle: 'code'}},
        }),
      ],
    }),
    defineField({name: 'packSize', title: 'Broj komada u paketu (ako nema varijanti)', type: 'string'}),
    defineField({name: 'onlineCode', title: 'Online šifra (ako nema varijanti)', type: 'string'}),
  ],
  preview: {select: {title: 'name', subtitle: 'brand.name', media: 'image', hidden: 'hidden'}, prepare: ({title, subtitle, media, hidden}) => ({title, subtitle: hidden ? `${subtitle ?? ''} (sakriveno)` : subtitle, media})},
})
