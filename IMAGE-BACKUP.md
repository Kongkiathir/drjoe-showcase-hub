# Website image backup

This repository includes **323 actual image files** (416,126,690 bytes, approximately 397 MiB), captured on 2026-11-17:

- `public/__l5e/assets-v1/`: 130 images referenced by the existing Lovable Assets pointers, preserved at their original URL paths for self-hosting.
- `public/gallery-backup/`: 193 current gallery uploads, named by gallery row ID. These are backup copies; the admin page continues to manage live Cloud storage.
- `public/image-backup-manifest.json`: relative file paths, byte counts, and SHA-256 hashes for every backup image. No signed URLs or credentials are included.

Some files contain identical image content under different original paths. Both copies are retained so existing references remain valid.

Three admin-upload JPEG files larger than 10,000,000 bytes were re-encoded at quality 95 with their original pixel dimensions to satisfy the repository's file limit. Their original hashes and byte counts remain in the manifest. Original Cloud storage files were not changed.

GitHub sync sends these files with the source code when this project is connected to the intended repository in Lovable's Git settings. Saving a commit does not establish or verify that connection.

Future admin uploads are **not** automatically committed to GitHub. Capture a new backup to include them. Exporting images does not export gallery database rows, accounts, or other Cloud services.