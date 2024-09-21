ALTER TABLE "users" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "students" DROP COLUMN IF EXISTS "phone_number";