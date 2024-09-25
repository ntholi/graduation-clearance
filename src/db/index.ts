// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

const queryClient = postgres(process.env.AUTH_DRIZZLE_URL!);
const db = drizzle(queryClient);

// const sql = neon(process.env.AUTH_DRIZZLE_URL!);
// const db = drizzle(sql, { schema });

export default db;
