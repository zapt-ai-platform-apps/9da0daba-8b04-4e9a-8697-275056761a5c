CREATE TABLE "workouts" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "exercise" TEXT NOT NULL,
  "sets" INTEGER NOT NULL,
  "reps" INTEGER NOT NULL,
  "weight" INTEGER NOT NULL,
  "date" TIMESTAMP DEFAULT NOW()
);