DROP POLICY IF EXISTS "Public can read gallery bucket objects" ON storage.objects;
CREATE POLICY "Admins can read gallery bucket objects"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'gallery'
  AND public.has_role((SELECT auth.uid()), 'admin'::public.app_role)
);
