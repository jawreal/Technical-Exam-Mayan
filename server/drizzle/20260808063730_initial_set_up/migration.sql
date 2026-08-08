CREATE TYPE "enum_status" AS ENUM('incomplete', 'complete');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"status" "enum_status" DEFAULT 'incomplete'::"enum_status",
	"description" text NOT NULL
);
