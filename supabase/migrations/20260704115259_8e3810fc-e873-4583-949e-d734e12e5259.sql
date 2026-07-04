-- Allow public read access to files in the 'gallery' storage bucket.
-- The gallery is a public showcase; images are already served via long-lived signed URLs.
-- Adding an explicit public SELECT policy makes the intent clear and lets storage
-- serve the objects directly without relying only on signed URLs.
CREATE POLICY "Public can read gallery bucket objects"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'gallery');