ALTER TABLE "finance_clearance" RENAME TO "finance_clearances";--> statement-breakpoint
ALTER TABLE "finance_clearances" DROP CONSTRAINT "finance_clearance_std_no_students_std_no_fk";
--> statement-breakpoint
ALTER TABLE "finance_clearances" DROP CONSTRAINT "finance_clearance_blocked_student_id_blocked_students_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "finance_clearances" ADD CONSTRAINT "finance_clearances_std_no_students_std_no_fk" FOREIGN KEY ("std_no") REFERENCES "public"."students"("std_no") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "finance_clearances" ADD CONSTRAINT "finance_clearances_blocked_student_id_blocked_students_id_fk" FOREIGN KEY ("blocked_student_id") REFERENCES "public"."blocked_students"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
