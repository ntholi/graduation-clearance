CREATE TABLE IF NOT EXISTS "finance_payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"std_no" varchar(9) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"receipt_no" varchar(10) NOT NULL,
	"item" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "finance_payments" ADD CONSTRAINT "finance_payments_std_no_students_std_no_fk" FOREIGN KEY ("std_no") REFERENCES "public"."students"("std_no") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
