import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  schema: './src/lib/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    uri: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
