CREATE TABLE "shared_workouts" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "workout_id" INTEGER NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "likes" INTEGER DEFAULT 0,
  "created_at" TIMESTAMP DEFAULT NOW()
);