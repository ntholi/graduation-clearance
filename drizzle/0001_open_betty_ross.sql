CREATE TABLE IF NOT EXISTS "students" (
	"id" integer NOT NULL,
	"studentNo" integer NOT NULL,
	"userId" text NOT NULL,
	"name" text,
	"email" text,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "students" ADD CONSTRAINT "students_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
