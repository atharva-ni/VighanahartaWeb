# VighanahartaWeb

Official Next.js 16 website for Vighanaharta Engineers.

## Live Website

- Primary domain: https://vighanahartaengineers.in
- Canonical domain: https://www.vighanahartaengineers.in

The app is configured to redirect non-www requests to the www domain.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4 + PostCSS
- Framer Motion (animations)
- Lucide React (icons)
- Resend (contact form email delivery)
- ESLint 9 (flat config)

## Main Features

- Multi-page marketing website for an industrial engineering business
- SEO metadata per route, dynamic sitemap, and robots configuration
- Contact form API with validation and email sending via Resend
- Mobile-first UI with animated sections and reusable layout components
- Brand and trust sections with services, clients, testimonials, and process timeline

## Routes

### Public Pages

- `/` Home
- `/about` About us
- `/services` Services
- `/clients` Clients and portfolio
- `/contact` Contact

### App-Level Utility Routes

- `/robots.txt` from `app/robots.js`
- `/sitemap.xml` from `app/sitemap.js`
- Global loading UI from `app/loading.jsx`
- Global error boundary from `app/error.jsx`
- Custom 404 page from `app/not-found.jsx`

## API

### `POST /api/contact`

Accepts JSON payload:

```json
{
	"name": "Your Name",
	"email": "you@example.com",
	"message": "Your message"
}
```

Behavior:

- Validates required fields: `name`, `email`, `message`
- Validates email format
- Escapes HTML before generating email body
- Sends email through Resend

Responses:

- `200` `{ "success": true }`
- `400` `{ "error": "...validation message..." }`
- `500` `{ "error": "...server/config message..." }`

## Environment Variables

Create `.env.local` in the project root:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=no-reply@vighanahartaengineers.in
RESEND_TO_EMAIL=vihanahartaengineers@gmail.com
GOOGLE_SITE_VERIFICATION=google-site-verification-token
BING_SITE_VERIFICATION=bing-site-verification-token
```

Notes:

- `RESEND_API_KEY` is required for contact emails.
- `RESEND_FROM_EMAIL` should be a verified sender domain in production.
- `RESEND_TO_EMAIL` is optional; defaults to `vihanahartaengineers@gmail.com`.
- Search verification keys are injected into metadata in `app/layout.jsx`.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Add `.env.local` using the example above.

### 3. Run development server

```bash
npm run dev
```

Open http://localhost:3000

## Scripts

- `npm run dev` Start local development server
- `npm run build` Build production bundle
- `npm run start` Start production server
- `npm run lint` Run ESLint checks (`eslint .`)

## Project Structure

```text
app/
	api/contact/route.js      # Contact form endpoint
	about/page.jsx            # About page
	services/page.jsx         # Services page
	clients/page.jsx          # Clients page
	contact/page.jsx          # Contact page
	page.jsx                  # Home page
	layout.jsx                # Global metadata + layout shell
	loading.jsx               # Global loading state
	error.jsx                 # Global error boundary
	not-found.jsx             # 404 page
	robots.js                 # robots.txt generator
	sitemap.js                # sitemap.xml generator

components/
	HomeContent.jsx
	AboutContent.jsx
	ServicesContent.jsx
	ClientsContent.jsx
	ContactContent.jsx
	Header.jsx
	Footer.jsx
	ProcessTimeline.jsx
	ScrollProgress.jsx
	BackToTop.jsx
	WhatsAppButton.jsx

lib/
	data.js                   # Services, clients, testimonials, portfolio data

public/
	clients/
	portfolio/
	services/
```

## SEO and Domain Notes

- Metadata is centrally defined in `app/layout.jsx` and extended per page.
- Canonical URLs point to `https://www.vighanahartaengineers.in`.
- `next.config.mjs` includes host-based redirect to force www domain.
- `app/robots.js` references sitemap at `/sitemap.xml`.

## Deployment

- `vercel.json` sets framework to Next.js.
- Build command: `npm run build`
- Start command: `npm run start`

For production, set all required environment variables in the deployment platform.

## Search Console Setup

- In Google Search Console, use Domain property: `vighanahartaengineers.in`
- Add provided DNS TXT record and verify
- For URL-prefix verification, set `GOOGLE_SITE_VERIFICATION`
- For Bing Webmaster verification, set `BING_SITE_VERIFICATION`

## Notes

- Project uses path alias `@/*` via `jsconfig.json`.
- Image optimization is enabled with AVIF/WebP formats.
- React strict mode is enabled.
