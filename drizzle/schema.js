import { pgTable, serial, text, timestamp, uuid, integer, array } from 'drizzle-orm/pg-core';

export const workouts = pgTable('workouts', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  exercise: text('exercise').notNull(),
  sets: integer('sets').notNull(),
  reps: integer('reps').notNull(),
  weight: integer('weight').notNull(),
  date: timestamp('date').defaultNow(),
});

export const meals = pgTable('meals', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  mealName: text('meal_name').notNull(),
  calories: integer('calories').notNull(),
  date: timestamp('date').defaultNow(),
});

export const customWorkouts = pgTable('custom_workouts', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  workoutName: text('workout_name').notNull(),
  exercises: text('exercises').array().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const sharedWorkouts = pgTable('shared_workouts', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  workoutId: integer('workout_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  likes: integer('likes').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

export const analytics = pgTable('analytics', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  date: timestamp('date').defaultNow(),
  value: integer('value').notNull(),
});

export const exercises = pgTable('exercises', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  muscleGroup: text('muscle_group'),
  equipment: text('equipment'),
});