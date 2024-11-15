import { meals } from '../drizzle/schema.js';
import { authenticateUser, Sentry } from "./_apiUtils.js";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const user = await authenticateUser(req);

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    const data = await db.select().from(meals).where(eq(meals.userId, user.id)).orderBy(meals.date);

    res.status(200).json(data);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}