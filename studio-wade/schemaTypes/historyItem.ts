import { defineType, defineField } from 'sanity'

export const historyItem = defineType({
  name: 'historyItem',
  title: 'Item da História (Estrela)',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Data / Ano',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Texto',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Imagem (opcional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
  },
})