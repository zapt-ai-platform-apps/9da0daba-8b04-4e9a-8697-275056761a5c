CREATE TABLE "custom_workouts" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "workout_name" TEXT NOT NULL,
  "exercises" TEXT[] NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);