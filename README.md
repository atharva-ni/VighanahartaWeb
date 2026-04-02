# VighanahartaWeb

Next.js 16 website for Vighanaharta Engineers.

## Scripts

- npm run dev: start local development server
- npm run build: create production build
- npm run start: run production server
- npm run lint: run ESLint checks

## Contact Form (Resend)

The contact form posts to /api/contact and sends email through Resend.

Create a local .env.local file with:

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=no-reply@vighanahartaengineers.in
RESEND_TO_EMAIL=vihanahartaengineers@gmail.com

Notes:
- Use a verified sender in RESEND_FROM_EMAIL for production.
- If RESEND_TO_EMAIL is omitted, it defaults to vihanahartaengineers@gmail.com.
