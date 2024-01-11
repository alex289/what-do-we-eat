import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './drizzle/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
