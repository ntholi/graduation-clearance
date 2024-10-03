ALTER TABLE "blocked_students" ADD COLUMN "unblocked_at" timestamp;--> statement-breakpoint
ALTER TABLE "blocked_students" ADD COLUMN "unblocked_by" varchar(21);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blocked_students" ADD CONSTRAINT "blocked_students_unblocked_by_users_id_fk" FOREIGN KEY ("unblocked_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
