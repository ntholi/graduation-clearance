ALTER TABLE "graduating_students" ADD COLUMN "created_by" varchar(21);--> statement-breakpoint
ALTER TABLE "graduating_students" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "graduating_students" ADD COLUMN "updated_by" varchar(21);--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "updated_at" timestamp;--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "updated_by" varchar(21);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "graduating_students" ADD CONSTRAINT "graduating_students_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "graduating_students" ADD CONSTRAINT "graduating_students_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
