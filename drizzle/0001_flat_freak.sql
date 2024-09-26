ALTER TABLE "clearance_responses" ADD COLUMN "blocked_student_id" varchar(21);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "clearance_responses" ADD CONSTRAINT "clearance_responses_blocked_student_id_blocked_students_id_fk" FOREIGN KEY ("blocked_student_id") REFERENCES "public"."blocked_students"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
