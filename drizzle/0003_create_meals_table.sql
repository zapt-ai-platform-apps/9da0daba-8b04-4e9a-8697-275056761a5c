CREATE TABLE "meals" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "meal_name" TEXT NOT NULL,
  "calories" INTEGER NOT NULL,
  "date" TIMESTAMP DEFAULT NOW()
);