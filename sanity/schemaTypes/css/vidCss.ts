import { defineType, defineField } from "sanity";

export const vidCss = defineType({
  name: "vidCss",
  title: "Video CSS",
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