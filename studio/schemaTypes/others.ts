import {defineArrayMember, defineField, defineType} from 'sanity'

const order = defineField({
  name: 'order',
  title: 'Redni broj (manji broj ide prvi)',
  type: 'number',
})

export const brand = defineType({
  name: 'brand',
  title: 'Brend',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Naziv', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'showOnBrandsPage',
      title: 'Prikaži na stranici Brendovi',
      type: 'boolean',
      description: 'Isključeno = brend se može birati na proizvodima, ali nema karticu na stranici Brendovi.',
      initialValue: true,
    }),
    defineField({name: 'logo', title: 'Logo', type: 'image'}),
    defineField({name: 'intro', title: 'Kratak opis (kartica na stranici Brendovi)', type: 'text', rows: 3}),
    defineField({name: 'long', title: 'Duži opis (stranica kataloga)', type: 'text', rows: 6}),
    order,
  ],
  orderings: [{title: 'Redoslijed', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', media: 'logo'}},
})

export const franchise = defineType({
  name: 'franchise',
  title: 'Franšizni partner',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Naziv', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'city', title: 'Grad', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'address', title: 'Adresa', type: 'string'}),
    defineField({name: 'phone', title: 'Kontakt (više brojeva odvojite zarezom)', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({
      name: 'hours',
      title: 'Radno vrijeme (jedan red po stavci)',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'image', title: 'Slika', type: 'image', options: {hotspot: true}}),
    order,
  ],
  orderings: [{title: 'Redoslijed', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'city', media: 'image'}},
})

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Uposlenik',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Ime i prezime', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', title: 'Pozicija', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'department', title: 'Odjel', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({name: 'phone', title: 'Telefon', type: 'string'}),
    order,
  ],
  orderings: [{title: 'Redoslijed', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'department'}},
})

export const educationPhoto = defineType({
  name: 'educationPhoto',
  title: 'Fotografija edukacijskog centra',
  type: 'document',
  fields: [
    defineField({name: 'image', title: 'Slika', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({name: 'alt', title: 'Opis slike', type: 'string'}),
    order,
  ],
  orderings: [{title: 'Redoslijed', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'alt', media: 'image'}},
})
