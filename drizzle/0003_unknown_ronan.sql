ALTER TABLE "students" DROP CONSTRAINT "students_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_userId_unique" UNIQUE("userId");