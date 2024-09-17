ALTER TABLE "signups" RENAME TO "signup_requests";--> statement-breakpoint
ALTER TABLE "signup_requests" DROP CONSTRAINT "signups_user_id_unique";--> statement-breakpoint
ALTER TABLE "signup_requests" DROP CONSTRAINT "signups_user_id_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_requests" ADD CONSTRAINT "signup_requests_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "signup_requests" ADD CONSTRAINT "signup_requests_user_id_unique" UNIQUE("user_id");