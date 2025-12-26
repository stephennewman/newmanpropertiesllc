# Newman Properties LLC

Digital real estate platform for local commercial properties. Lead generation through plaza landing pages with priority-based scheduling.

## Tech Stack

- **Framework:** Next.js 16 (Turbopack)
- **Styling:** Tailwind CSS 4
- **Email:** Resend
- **Database:** Supabase (optional)
- **Hosting:** Vercel

## Project Structure

```
newmanpropertiesllc/
├── app/
│   ├── page.tsx                    # Main homepage
│   ├── sites/[slug]/
│   │   ├── page.tsx                # Dynamic plaza landing pages
│   │   └── inquire/page.tsx        # Multi-step inquiry form
│   ├── components/
│   │   └── PlazaPage.tsx           # Reusable plaza page component
│   ├── utils/
│   │   ├── leadScoring.ts          # Lead qualification logic
│   │   └── supabase.ts             # Database client
│   └── api/
│       └── inquiry/route.ts        # Form submission handler
├── middleware.ts                    # Subdomain routing
├── data/
│   └── properties.ts               # Plaza data (tenants, addresses)
└── vercel.json
```

## Properties

- **Palm Harbor Plaza** - palmharborplaza.newmanpropertiesllc.com
- **Coral Landings** - corallandings.newmanpropertiesllc.com
- **Highland Lakes Plaza** - highlandlakes.newmanpropertiesllc.com

## Lead Scoring

Inquiries are scored 0-100 based on:
- Business Type (0-25 pts)
- Space Needed (0-35 pts)
- Timeline (0-25 pts)
- Budget (0-15 pts)

**Priority Levels:**
- 70+ = High → Tour slots this week
- 45-69 = Medium → Next week
- Under 45 = Low → 2+ weeks out

## Local Development

```bash
npm install
npm run dev
```

Visit:
- http://localhost:3000 - Main homepage
- http://localhost:3000/sites/palmharborplaza - Plaza page
- http://localhost:3000/sites/palmharborplaza/inquire - Inquiry form

## Environment Variables

```env
# Resend (Required for email notifications)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Supabase (Optional - for lead storage)
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=xxxxxxxxxxxxx
```

## Vercel Deployment

### 1. Connect Repository
Push to GitHub and connect to Vercel.

### 2. Add Environment Variables
Add `RESEND_API_KEY` in Vercel project settings.

### 3. Configure Wildcard Subdomain
In Vercel Domains, add:
- `newmanpropertiesllc.com`
- `*.newmanpropertiesllc.com` (wildcard)

### 4. DNS Configuration
Point your domain to Vercel:
- A record: `76.76.21.21`
- CNAME: `cname.vercel-dns.com`

## Adding New Properties

1. Add property data to `data/properties.ts`
2. Add subdomain to `middleware.ts` PLAZA_SUBDOMAINS array
3. Deploy

## Legal Disclaimer

Each plaza page includes:
> "This site is an independent directory and is not affiliated with or endorsed by the property owner or management company."
