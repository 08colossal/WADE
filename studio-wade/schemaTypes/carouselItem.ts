import { defineType, defineField } from 'sanity'

export const carouselItem = defineType({
  name: 'carouselItem',
  title: 'Item do Carrossel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Slide',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Nome do Produto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Imagem PNG',
      type: 'image',
      options: {
        accept: 'image/png',
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
      subtitle: 'subtitle',
      media: 'image',
    },
  },
})