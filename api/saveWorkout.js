import { workouts } from '../drizzle/schema.js';
import { authenticateUser } from "./_apiUtils.js";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { Sentry } from './sentry.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);

    const { exercise, sets, reps, weight } = req.body;

    if (!exercise || !sets || !reps || !weight) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    const [result] = await db.insert(workouts).values({
      userId: user.id,
      exercise,
      sets: parseInt(sets, 10),
      reps: parseInt(reps, 10),
      weight: parseInt(weight, 10),
    }).returning();

    res.status(201).json(result);
  } catch (error) {
    console.error('Error saving workout:', error);
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error saving workout' });
  }
}