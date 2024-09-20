ALTER TABLE "cleared_faculty_students" RENAME TO "faculty_clearances";--> statement-breakpoint
ALTER TABLE "faculty_clearances" DROP CONSTRAINT "cleared_faculty_students_std_no_students_std_no_fk";
--> statement-breakpoint
ALTER TABLE "faculty_clearances" ADD PRIMARY KEY ("std_no");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "faculty_clearances" ADD CONSTRAINT "faculty_clearances_std_no_students_std_no_fk" FOREIGN KEY ("std_no") REFERENCES "public"."students"("std_no") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
