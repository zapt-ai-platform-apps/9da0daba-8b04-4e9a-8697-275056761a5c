CREATE TABLE "analytics" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "date" TIMESTAMP DEFAULT NOW(),
  "value" INTEGER NOT NULL
);