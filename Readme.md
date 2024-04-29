![cover](https://repository-images.githubusercontent.com/306412712/6db8458b-8415-407c-9629-712720d57cb1)

# What do we eat?

> Inspired by https://github.com/t3dotgg/t3gallery

Web app to tell you what to eat

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) and [Shadcn](https://ui.shadcn.com/)

## Overview

- `src/app/*` - All pages.
- `src/app/api/*` - All route handlers.
- `src/components/*` - All custom components and Shadcn components.
- `src/lib/*` - A collection of helpful utilities or code for external services.
- `src/server/*` - Server related code like database stuff and rate limiting.
- `src/styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.
- `src/types/*` - All types
- `public/*` - Static assets including fonts and images.

## Running Locally

```bash
$ git clone https://github.com/Alex289/what-do-we-eat.git
$ cd what-do-we-eat
$ pnpm
$ cp .env.example .env
# Fill in the .env file
$ pnpm dev
```

## Cloning / Forking

Please review the [license](https://github.com/Alex289/what-do-we-eat/blob/main/LICENSE) and remove all of my personal information.
