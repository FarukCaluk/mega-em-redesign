import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Kategorija',
  type: 'document',
  fields: [defineField({name: 'title', title: 'Naziv kategorije', type: 'string', validation: (r) => r.required()})],
  orderings: [{title: 'Abecedno', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
  preview: {select: {title: 'title'}},
})

export const subcategory = defineType({
  name: 'subcategory',
  title: 'Podkategorija',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Naziv podkategorije', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'category',
      title: 'Kategorija kojoj pripada',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (r) => r.required(),
    }),
  ],
  orderings: [{title: 'Abecedno', name: 'titleAsc', by: [{field: 'title', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'category.title'}},
})
