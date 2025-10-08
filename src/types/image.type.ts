export type TransformedImageResponse = {
  id: number;
  transformed_image_url: string;
  original_image_url: string;
  mime_type: string | null;
  size_in_bytes: number | null;
  created_at: Date;
};
