# AI Onboarding - Newman Properties LLC

## Project Overview

**Newman Properties LLC** is a digital real estate platform for local commercial properties in Palm Harbor, Florida. The platform generates leads through plaza landing pages with priority-based scheduling for property tours.

### Purpose
- Create digital presence for commercial shopping plazas
- Generate qualified leads through multi-step inquiry forms
- Score leads based on business type, space needs, timeline, and budget
- Automate tour scheduling with priority-based availability windows

### Main Features
1. **Plaza Landing Pages** - Individual branded pages for each shopping center
2. **Multi-Step Inquiry Form** - 6-step qualification funnel with smart lead scoring
3. **Lead Scoring System** - 0-100 point scoring algorithm determining priority
4. **Tour Scheduling** - Priority-based availability (high = this week, medium = next week, low = 2+ weeks)
5. **Email Notifications** - Owner alerts + user confirmations via Resend
6. **Supabase Integration** - Optional lead storage in database

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16.1.1 (Turbopack) |
| React | 19.2.3 |
| Styling | Tailwind CSS 4 |
| Email | Resend |
| Database | Supabase (optional) |
| Hosting | Vercel |
| Icons | Lucide React |
| Language | TypeScript |

## Project Structure

```
newmanpropertiesllc/
├── app/
│   ├── page.tsx                    # Main homepage - property listings
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles + CSS variables
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
└── vercel.json                     # Vercel config
```

## Properties (5 Plazas)

| Property | Subdomain | Accent Color | Status |
|----------|-----------|--------------|--------|
| Palm Harbor Plaza | palmharborplaza.newmanpropertiesllc.com | Teal #0D9488 | Active |
| Coral Landings Shopping Plaza | corallandings.newmanpropertiesllc.com | Orange #F97316 | Active |
| Highland Lakes Plaza | highlandlakes.newmanpropertiesllc.com | Indigo #6366F1 | Active |
| Seabreeze Shopping Center | seabreeze.newmanpropertiesllc.com | Sky Blue #0EA5E9 | Active |
| Palm Harbor Shops | palmharborshops.newmanpropertiesllc.com | Red #DC2626 | Active |

## Lead Scoring Algorithm

Inquiries are scored 0-100 based on:
- **Business Type (0-25 pts)**: Restaurant/Medical = 25, Professional = 20, Retail = 15, Services = 10
- **Space Needed (0-35 pts)**: 10,000+ SF = 35, 5,000-10,000 = 25, 2,000-5,000 = 15, Under 2,000 = 5
- **Timeline (0-25 pts)**: ASAP = 25, 3 months = 15, 6 months = 8, Exploring = 2
- **Budget (0-15 pts)**: $10k+ = 15, $6k-10k = 10, $4k-6k = 5, Under $4k = 0

**Priority Levels:**
- 70+ = **High** → Tour slots this week
- 45-69 = **Medium** → Next week
- Under 45 = **Low** → 2+ weeks out

## Environment Variables Required

```env
# Resend (Required for email notifications)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Supabase (Optional - for lead storage)
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=xxxxxxxxxxxxx

# Google Analytics (Required for analytics reports)
GA_PROPERTY_ID=xxxxxxxxxxxxx
GA_CLIENT_EMAIL=xxxxxxxxxxxxx@xxxxxxxxxxxxx.iam.gserviceaccount.com
GA_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----

# Slack Notifications (Required for analytics reports)
SLACK_ANALYTICS_WEBHOOK=https://hooks.slack.com/services/xxxxx/xxxxx/xxxxx

# Vercel Cron Security
CRON_SECRET=your-secure-random-string
```

## Local Development

```bash
npm install
npm run dev
```

Visit:
- http://localhost:3000 - Main homepage
- http://localhost:3000/sites/palmharborplaza - Plaza page
- http://localhost:3000/sites/palmharborplaza/inquire - Inquiry form

## Current Status

- ✅ All 5 plazas configured and active
- ✅ Lead scoring system fully operational
- ✅ Email notifications working (owner + user confirmation)
- ✅ Supabase integration for lead storage
- ✅ Subdomain routing via middleware
- ✅ Multi-step inquiry form with scheduling
- ✅ Deployed to Vercel

---

## Deployment Log

### December 29, 2025 - 7:50 AM EST
**Google Analytics & Slack Integration**: Added analytics infrastructure
- Installed `@google-analytics/data` package
- Created `app/utils/googleAnalytics.ts` - full GA4 API integration with trend tracking
- Created API routes: `/api/analytics/daily`, `/api/analytics/weekly`, `/api/analytics/monthly`, `/api/analytics/test`
- Configured Vercel cron jobs (daily at 8am EST, weekly on Mondays, monthly on 1st)
- Slack notifications for site progress reports
- **Events tracked**: `tour_click`, `phone_click`, `inquiry_form_open`, `inquiry_form_start`, `inquiry_form_submit`

### December 29, 2025 - 7:35 AM EST
**Session Start**: AI onboarding document created. Indexed codebase and reviewed project structure.

### Previous Deployments (from Git history)

| Commit | Description | Date |
|--------|-------------|------|
| `6813f8c` | Fix: specific time slots, cursor-pointer on buttons, user confirmation email | Recent |
| `974d233` | Fix subdomain links - remove /sites/ prefix | Recent |
| `e8a85a1` | Add seabreeze and palmharborshops to subdomain middleware | Recent |
| `dd6cb7d` | Add 2 new plazas with verified Google Maps tenant data | Recent |
| `0b3b271` | Add Supabase newman_leads table integration | Recent |
| `5562099` | Fix: Update CTA links to use correct /sites/[slug] paths | Recent |
| `d62b953` | Initial commit: Newman Properties LLC - Digital real estate platform | Initial |

---

## Problems & Opportunities

### Current Problems (Scored 0-100)

| Score | Problem | Impact |
|-------|---------|--------|
| 65 | **No analytics/tracking** - No way to measure conversion rates, traffic sources, or user behavior | High |
| 55 | **No mobile-first testing** - UI may have UX issues on smaller screens | Medium |
| 50 | **Limited SEO optimization** - Basic metadata but no structured data, sitemap, or robots.txt | Medium |
| 45 | **No error monitoring** - No Sentry or similar error tracking in production | Medium |
| 40 | **Single email recipient** - All leads go to one email address (stephen@krezzo.com) | Low |
| 35 | **No image optimization** - No property/plaza images, only emojis and icons | Low |
| 30 | **No A/B testing** - Can't optimize conversion funnel | Low |

### High-Value Opportunities (Scored 0-100)

| Score | Opportunity | Potential Impact |
|-------|-------------|------------------|
| 85 | **Add Google Analytics / Vercel Analytics** - Track conversions, understand traffic | High ROI |
| 80 | **Add property images** - Real photos would significantly improve trust/conversions | High ROI |
| 75 | **Add testimonials/social proof** - Reviews from current tenants | High ROI |
| 70 | **SMS notifications** - Text alerts for high-priority leads | Medium ROI |
| 65 | **Lead dashboard** - Admin view to manage all leads in one place | Medium ROI |
| 60 | **Virtual tour integration** - 360° photos or video tours | Medium ROI |
| 55 | **CRM integration** - Push leads to HubSpot, Salesforce, etc. | Medium ROI |
| 50 | **Available space listings** - Show actual available units with pricing | Medium ROI |

