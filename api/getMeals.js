import { meals } from '../drizzle/schema.js';
import { authenticateUser, sentryWrapper } from "./_apiUtils.js";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const user = await authenticateUser(req);

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    const data = await db.select().from(meals).where(eq(meals.userId, user.id)).orderBy(meals.date);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching meals:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error fetching meals' });
    }
    throw error; // Rethrow to be caught by sentryWrapper
  }
};

export default sentryWrapper(handler);