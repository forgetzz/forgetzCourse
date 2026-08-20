import { defineType, defineField } from "sanity";

export const pdfJs = defineType({
  name: "pdfJs",
  title: "PDF Javascipt",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
       defineField({
          name: 'level',
          title: 'Level',
          type: 'number',
          validation: (Rule) => Rule.required().min(1)
        }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "file",
      title: "PDF File",
      type: "file",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
});