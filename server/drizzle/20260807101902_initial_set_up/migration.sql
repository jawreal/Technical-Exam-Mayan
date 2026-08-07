CREATE TYPE "status_enum" AS ENUM('incomplete', 'complete');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"status" "status_enum" DEFAULT 'incomplete'::"status_enum",
	"description" text NOT NULL
);
