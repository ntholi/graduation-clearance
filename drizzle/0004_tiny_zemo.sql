ALTER TABLE "faculty_clearance" RENAME TO "graduating_students";--> statement-breakpoint
ALTER TABLE "graduating_students" DROP CONSTRAINT "faculty_clearance_std_no_students_std_no_fk";
--> statement-breakpoint
ALTER TABLE "graduating_students" ADD COLUMN "faculty" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "graduating_students" ADD CONSTRAINT "graduating_students_std_no_students_std_no_fk" FOREIGN KEY ("std_no") REFERENCES "public"."students"("std_no") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
