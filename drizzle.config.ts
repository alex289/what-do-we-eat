import { defineConfig } from "drizzle-kit";

import { env } from './src/env.mjs';

export default defineConfig({
  schema: './src/server/db/schema.ts',
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ['wdwe_*'],
});
