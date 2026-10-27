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
    defineField({name: 'sku', title: 'Šifra Mega-Em', type: 'string'}),
    defineField({name: 'brand', title: 'Brend', type: 'string'}),
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
      name: 'hidden',
      title: 'Sakriveno na sajtu',
      type: 'boolean',
      description: 'Uključeno = proizvod se ne prikazuje u katalogu. Isključite kad popunite brend, kategoriju i opis.',
      initialValue: false,
    }),
    defineField({name: 'supplierName', title: 'Naziv dobavljača', type: 'string'}),
    defineField({name: 'supplierCode', title: 'Šifra dobavljača', type: 'string'}),
    defineField({name: 'manufacturer', title: 'Proizvođač', type: 'string'}),
    defineField({name: 'image', title: 'Slika', type: 'image', options: {hotspot: true}}),
    defineField({name: 'intro', title: 'Uvodna rečenica (prikazuje se na kartici)', type: 'string'}),
    defineField({name: 'description', title: 'Opis', type: 'text', rows: 6}),
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
  preview: {select: {title: 'name', subtitle: 'brand', media: 'image', hidden: 'hidden'}, prepare: ({title, subtitle, media, hidden}) => ({title, subtitle: hidden ? `${subtitle ?? ''} (sakriveno)` : subtitle, media})},
})
