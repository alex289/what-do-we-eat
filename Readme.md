![cover](https://repository-images.githubusercontent.com/306412712/8823f78f-aacb-482e-b362-25a7e1b46001)

# What do we eat?

Web app to tell you what to eat

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PlanetScale](https://planetscale.com)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [Next Auth](https://next-auth.js.org)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Overview

- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction).
- `pages/dashboard` - Managing the db entries aka the food.
- `pages/*` - All static pages. (Index and 404)
- `public/*` - Static assets including fonts and images.
- `prisma/*` - My Prisma schema, which uses a PlanetScale MySQL database.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.
- `types/*` - All types

## Running Locally

```bash
$ git clone https://github.com/Alex289/what-do-we-eat.git
$ cd what-do-we-eat
$ pnpm
$ pnpm dev
```

Create a `.env` file  similar to [`.env.example`](https://github.com/Alex289/what-do-we-eat/blob/main/.env.example)

## Cloning / Forking

Please review the [license](https://github.com/Alex289/what-do-we-eat/blob/main/LICENSE) and remove all of my personal information (resume, blog posts, images, etc.).