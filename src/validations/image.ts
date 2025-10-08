import * as z from 'zod';

export const UploadImagesSchema = z.object({
  filename: z.string().min(1),
  contentType: z.enum(['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  filesize: z.number().min(1).max(10485760), // 10MB limit
});

const SupportedImageTypes = z.enum(['jpeg', 'png', 'webp', 'avif']);

export const TransformImageSchema = z.object({
  transformation: z.object({
    resize: z
      .object({
        width: z.number().min(1).max(10000),
        height: z.number().min(1).max(10000),
        fit: z
          .enum(['cover', 'contain', 'fill', 'inside', 'outside'])
          .default('cover'),
      })
      .optional(),
    crop: z
      .object({
        width: z.number().min(1).max(10000),
        height: z.number().min(1).max(10000),
        x: z.number().min(0).max(10000).default(0),
        y: z.number().min(0).max(10000).default(0),
      })
      .optional(),
    rotate: z.number().min(0).max(360).optional(),
    format: SupportedImageTypes.default('webp'),
    quality: z.number().min(0).max(100).default(80),
    grayscale: z.boolean().default(false),
    lossless: z.boolean().default(false),
  }),
});

export type TransformImageSchemaType = z.infer<typeof TransformImageSchema>;
