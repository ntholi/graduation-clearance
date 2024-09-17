DO $$ BEGIN
 CREATE TYPE "public"."blocked_by" AS ENUM('finance', 'library', 'resource', 'it');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blocked_students" (
	"id" serial PRIMARY KEY NOT NULL,
	"std_no" integer NOT NULL,
	"blocked_by" "blocked_by" NOT NULL,
	"reason" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blocked_students" ADD CONSTRAINT "blocked_students_std_no_students_std_no_fk" FOREIGN KEY ("std_no") REFERENCES "public"."students"("std_no") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
