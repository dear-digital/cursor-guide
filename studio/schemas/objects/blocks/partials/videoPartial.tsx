import {defineField} from 'sanity';

export default defineField({
  name: 'videoPartial',
  type: 'object',
  fields: [
    defineField({
      name: 'asset',
      description: 'Upload a video from sanity',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'youtubeUrl',
      description: 'Paste a YouTube URL',
      type: 'url',
      validation: (Rule: any) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
          message: 'Please enter a valid YouTube URL',
        }).custom((url: string) => {
          if (!url) return true; // Allow empty field
          const youtubeRegex =
            /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
          return youtubeRegex.test(url) || 'Please enter a valid YouTube URL';
        }),
    }),
    defineField({
      name: 'externalUrl',
      description: 'Paste an external video URL',
      type: 'url',
    }),
    defineField({
      name: 'ratio',
      description: 'Aspect ratio',
      type: 'ratioPartial',
    }),
  ],
});
