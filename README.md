# Custom Note Service – Supabase Mini Project

This project is a minimal note-taking backend using Supabase Edge Functions. It supports creating and retrieving personal notes via REST endpoints.

---

## Setup & Deployment

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Create the `notes` table by executing `schema.sql` in the Supabase SQL Editor.
3. Install Supabase CLI:
   ```bash
   bun install supabase --global
   ```
4. Initialise supabase in your directory
   ```
   supabase init
    ```
5. After writing your endpoints deploying them.
    ```
    supabase functions deploy post_notes
    supabase functions deploy get_notes
    ```
6. Connect to supabase project through CLI and also make sure to add the secrets to your edge functions before deployment.

## Schema Design

A Simple schema is used here, which can further be extended and improvised based on the use cases.
1. An "id" for each note, unique and primary key.
2. "user_id" to map to unique users.
3. "content" of type text for storage of the note-content.

## Demo curl commands
#### Create a Note (POST /notes) :
  ```
  curl -L -X POST 'https://iyuwhikkttuscyrzdolh.supabase.co/functions/v1/post_notes' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dXdoaWtrdHR1c2N5cnpkb2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTY5NTYsImV4cCI6MjA2MTU3Mjk1Nn0.LVj-oCtWW_UKhf30J8pUTsY5SvA7swQWzcQint1u-vw' \
  -H 'Content-Type: application/json' \
  --data '{
    "content": "This is a test note to create : 1",
    "user_id": "100"
  }'
  ```
  ```
  curl -L -X POST 'https://iyuwhikkttuscyrzdolh.supabase.co/functions/v1/post_notes' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dXdoaWtrdHR1c2N5cnpkb2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTY5NTYsImV4cCI6MjA2MTU3Mjk1Nn0.LVj-oCtWW_UKhf30J8pUTsY5SvA7swQWzcQint1u-vw' \
  -H 'Content-Type: application/json' \
  --data '{
    "content": "This is a test note to create : 2",
    "user_id": "200"
  }'
  ```

  #### Retrieve Notes (GET /notes) :
  ```
  curl -L -X POST 'https://iyuwhikkttuscyrzdolh.supabase.co/functions/v1/get_notes?user_id=100' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dXdoaWtrdHR1c2N5cnpkb2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTY5NTYsImV4cCI6MjA2MTU3Mjk1Nn0.LVj-oCtWW_UKhf30J8pUTsY5SvA7swQWzcQint1u-vw' \
  -H 'Content-Type: application/json' \
  ```
  ```
  curl -L -X POST 'https://iyuwhikkttuscyrzdolh.supabase.co/functions/v1/get_notes?user_id=200' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dXdoaWtrdHR1c2N5cnpkb2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5OTY5NTYsImV4cCI6MjA2MTU3Mjk1Nn0.LVj-oCtWW_UKhf30J8pUTsY5SvA7swQWzcQint1u-vw' \
  -H 'Content-Type: application/json' \
  ```