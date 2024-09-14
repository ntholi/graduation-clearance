CREATE TABLE IF NOT EXISTS "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"std_no" text,
	"name" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
