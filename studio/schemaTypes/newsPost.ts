import {defineArrayMember, defineField, defineType} from 'sanity'

export const newsPost = defineType({
  name: 'newsPost',
  title: 'Novost',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Naslov', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'slug',
      title: 'Adresa na sajtu (slug)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({name: 'date', title: 'Datum objave', type: 'date', validation: (r) => r.required()}),
    defineField({name: 'category', title: 'Kategorija', type: 'string', initialValue: 'Kompanija'}),
    defineField({
      name: 'pinned',
      title: 'Istaknuta vijest',
      type: 'boolean',
      description: 'Samo jedna vijest treba biti istaknuta: prikazuje se velika na vrhu stranice Novosti.',
      initialValue: false,
    }),
    defineField({name: 'image', title: 'Slika', type: 'image', options: {hotspot: true}}),
    defineField({name: 'excerpt', title: 'Kratak opis', type: 'text', rows: 3}),
    defineField({
      name: 'content',
      title: 'Tekst vijesti',
      type: 'array',
      of: [defineArrayMember({type: 'block', styles: [{title: 'Normalno', value: 'normal'}], lists: [], marks: {decorators: [], annotations: []}})],
    }),
  ],
  orderings: [{title: 'Najnovije prvo', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'date', media: 'image'}},
})
