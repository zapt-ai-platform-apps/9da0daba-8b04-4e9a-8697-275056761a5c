import { workouts } from '../drizzle/schema.js';
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

    const data = await db.select().from(workouts).where(eq(workouts.userId, user.id)).orderBy(workouts.date);

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    if (error.message.includes('Authorization') || error.message.includes('token')) {
      res.status(401).json({ error: 'Authentication failed' });
    } else {
      res.status(500).json({ error: 'Error fetching workouts' });
    }
    throw error; // Rethrow to be caught by sentryWrapper
  }
};

export default sentryWrapper(handler);