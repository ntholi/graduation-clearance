DO $$ BEGIN
 CREATE TYPE "public"."finance_clearance_status" AS ENUM('pending', 'cleared', 'blocked');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "finance_clearance" (
	"id" serial PRIMARY KEY NOT NULL,
	"std_no" integer NOT NULL,
	"status" "finance_clearance_status" DEFAULT 'pending' NOT NULL,
	"blocked_student_id" varchar(21),
	"cleared_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "finance_clearance" ADD CONSTRAINT "finance_clearance_std_no_students_std_no_fk" FOREIGN KEY ("std_no") REFERENCES "public"."students"("std_no") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "finance_clearance" ADD CONSTRAINT "finance_clearance_blocked_student_id_blocked_students_id_fk" FOREIGN KEY ("blocked_student_id") REFERENCES "public"."blocked_students"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
