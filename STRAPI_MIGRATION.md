# Strapi migration and operations guide

The Next.js site now uses Strapi's REST API as its primary content source. The original files in `src/app/data/` remain only as a temporary, user-visible outage fallback and as the source for the repeatable seed generator. Do not remove them until the production CMS has been validated.

## Architecture

- Next.js keeps the existing Clerk sign-in and UI.
- Public room, activity, menu, gallery, and review reads come from Strapi.
- The browser sends a Clerk session token for review writes and all booking writes.
- Strapi verifies that token and mirrors its verified `sub` into a private `Site User` record.
- Review and booking ownership is derived only from that verified identity. Browser-supplied user IDs, prices, totals, and verification flags are ignored.
- Room booking totals and activity prices are recalculated from current Strapi content.

## Local setup

Use Node.js 22 for both applications. Install each dependency tree:

```bash
npm install
npm --prefix backend install
```

Create the frontend environment file:

```bash
cp .env.example .env.local
```

Set the existing Clerk application's values and the CMS URL:

```dotenv
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Create Strapi's environment file and preserve the generated random secrets already present in `backend/.env` if one exists:

```bash
cp backend/.env.example backend/.env
```

At minimum, set strong Strapi secrets plus the same Clerk secret used by Next.js:

```dotenv
CLERK_SECRET_KEY=sk_test_...
CLERK_AUTHORIZED_PARTIES=http://localhost:3000,http://127.0.0.1:3000
FRONTEND_URL=http://localhost:3000,http://127.0.0.1:3000
AUTO_SEED=true
```

`CLERK_JWT_KEY` is optional. It can contain Clerk's PEM public key for offline JWT verification. Keep `CLERK_SECRET_KEY` when Strapi should also retrieve the user's display name, email, and avatar from Clerk.

Seed the database and media library, then start both applications in separate terminals:

```bash
npm run seed:cms
npm run dev:cms
```

```bash
npm run dev
```

Open `http://localhost:1337/admin` to create the first Strapi administrator. The site is at `http://localhost:3000`.

## Content and media import

`npm run seed:cms` first regenerates `backend/src/seed/data.json` from the preserved local modules, then idempotently upserts:

- 12 rooms and their image galleries
- 12 activities and their images
- 9 restaurant menu items and operating hours
- 4 gallery entries and images
- 6 historical reviews, linked to matching rooms where possible

The import uses each item's legacy numeric ID, so it can be run repeatedly. Existing media is not uploaded twice. Historical reviews intentionally have no owner and therefore cannot be claimed, edited, or deleted by a browser user.

After production content has been verified, future edits should be made in Strapi Admin. Leave `AUTO_SEED=false` if local seed data should no longer overwrite editorial field changes during restarts.

## REST endpoints

Public reads:

```text
GET /api/rooms?populate[images]=true
GET /api/activities?populate[image]=true
GET /api/menu-items?populate[image]=true
GET /api/gallery-items?populate[image]=true
GET /api/reviews
GET /api/reviews/:documentId
```

Clerk bearer token required:

```text
POST   /api/room-bookings
POST   /api/table-bookings
POST   /api/activity-bookings
POST   /api/reviews
PUT    /api/reviews/:documentId
DELETE /api/reviews/:documentId
```

There are no public read routes for site users or bookings. Strapi Admin is the management surface for those records.

## Ownership verification with two users

After real Clerk keys are configured:

1. Sign in as user A and create a review from the home page.
2. Confirm that Edit and Delete appear only on user A's card.
3. In a private browser session, sign in as user B. Confirm those controls are absent.
4. Copy user A's review `documentId` from the public response and attempt a direct `PUT` using user B's Clerk bearer token. Strapi must return `403 Forbidden`.
5. Repeat with `DELETE`; it must also return `403 Forbidden`.
6. Send either request with no token, an invalid token, or a forged `user` property. It must return `401 Unauthorized`, and the review must remain unchanged.

The automated test for the owner comparison is run with:

```bash
npm --prefix backend test
```

## Production deployment

Deploy Strapi before Next.js so the public CMS URL is available during frontend configuration.

1. Use PostgreSQL or MySQL rather than the default SQLite file. Set `DATABASE_CLIENT`, `DATABASE_URL` or the individual `DATABASE_*` values in the Strapi host.
2. Set strong production values for every Strapi secret in `backend/.env.example`.
3. Set `CLERK_SECRET_KEY`, production `CLERK_AUTHORIZED_PARTIES`, and `FRONTEND_URL` to the exact HTTPS frontend origin.
4. Use durable media storage. The local upload provider is suitable for development only when the host filesystem is ephemeral; configure a Strapi S3-compatible upload provider or a persistent volume for production.
5. Run `npm --prefix backend run seed` once against the production database, or enable `AUTO_SEED=true` for the first boot and disable it after validation.
6. Build and start Strapi with `npm --prefix backend run build` and `npm --prefix backend run start`.
7. Set `NEXT_PUBLIC_STRAPI_URL=https://cms.example.com` in the Next.js deployment, add that exact media hostname to `images.remotePatterns` in `next.config.mjs`, then run `npm run build` and `npm start`.
8. Verify public reads, all three booking forms, review CRUD, media URLs, CORS, and the two-user ownership procedure before removing any fallback data.

The local-IP image optimization exception in `next.config.mjs` enables itself only when `NEXT_PUBLIC_STRAPI_URL` is `localhost` or `127.0.0.1`; it stays disabled for a production CMS domain.
