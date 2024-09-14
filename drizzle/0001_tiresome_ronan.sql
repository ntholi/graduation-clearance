ALTER TABLE "grades" RENAME COLUMN "std_no" TO "enrollment_id";--> statement-breakpoint
ALTER TABLE "grades" DROP CONSTRAINT "grades_std_no_students_std_no_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "grades" ADD CONSTRAINT "grades_enrollment_id_enrollments_id_fk" FOREIGN KEY ("enrollment_id") REFERENCES "public"."enrollments"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
