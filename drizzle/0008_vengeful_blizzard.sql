DO $$ BEGIN
 CREATE TYPE "public"."blocked_student_status" AS ENUM('blocked', 'unblocked');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "blocked_students" RENAME COLUMN "blocked_by" TO "department";--> statement-breakpoint
ALTER TABLE "blocked_students" ADD COLUMN "status" "blocked_student_status" DEFAULT 'blocked' NOT NULL;