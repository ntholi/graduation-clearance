DO $$ BEGIN
 CREATE TYPE "public"."gender" AS ENUM('male', 'female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "gender" "gender";--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "nationality" varchar(50);--> statement-breakpoint
ALTER TABLE "students" ADD COLUMN "date_of_birth" date;