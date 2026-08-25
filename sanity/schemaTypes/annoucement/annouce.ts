import { defineType, defineField } from "sanity";

export const announcement = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
    }),

    defineField({
      name: "image",
      title: "Gambar Iklan",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "buttonText",
      title: "Text Tombol",
      type: "string",
      initialValue: "Lihat Sekarang",
    }),

    defineField({
      name: "link",
      title: "Link",
      type: "url",
    }),

    defineField({
      name: "active",
      title: "Aktif",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
      active: "active",
    },

    prepare({ title, media, active }) {
      return {
        title,
        subtitle: active ? "Aktif" : "Tidak Aktif",
        media,
      };
    },
  },
});