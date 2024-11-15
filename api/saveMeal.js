import { meals } from '../drizzle/schema.js';
import { authenticateUser, sentryWrapper } from "./_apiUtils.js";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const user = await authenticateUser(req);

    const { mealName, calories } = req.body;

    if (!mealName || !calories) {
      res.status(400).json({ error: 'Meal name and calories are required' });
      return;
    }

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    const [result] = await db.insert(meals).values({
      userId: user.id,
      mealName,
      calories: parseInt(calories, 10),
    }).returning();

    res.status(201).json(result);
  } catch (error) {
    console.error('Error saving meal:', error);
    res.status(500).json({ error: 'Error saving meal' });
    throw error; // Rethrow to be caught by sentryWrapper
  }
};

export default sentryWrapper(handler);