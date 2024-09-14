import type { Config } from 'drizzle-kit';

if (!process.env.AUTH_DRIZZLE_URL) {
  throw new Error('AUTH_DRIZZLE_URL must be a Neon postgres connection string');
}

export default {
  schema: ['./src/db/schema/index.ts', './src/db/schema/auth.ts'],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL,
  },
} satisfies Config;
