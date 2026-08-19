import { defineType, defineField } from "sanity";

export const vidHtml = defineType({
  name: "vidHtml",
  title: "Video Html",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
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