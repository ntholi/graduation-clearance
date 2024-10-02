import type { Config } from 'drizzle-kit';

if (!process.env.AUTH_DRIZZLE_URL) {
  throw new Error('AUTH_DRIZZLE_URL must be set');
}

console.log('Drizzle URL:', process.env.AUTH_DRIZZLE_URL);

export default {
  schema: ['./src/db/schema/index.ts', './src/db/schema/auth.ts'],
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL as string,
  },
} satisfies Config;
