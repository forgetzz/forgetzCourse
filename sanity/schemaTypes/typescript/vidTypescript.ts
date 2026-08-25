import { defineType, defineField } from "sanity";

export const vidTypescript = defineType({
  name: "vidTs",
  title: "Video Typescript",
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
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
  ],
});