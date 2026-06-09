const { execSync } = require("child_process");

if (process.env.DATABASE_URL) {
  console.log("DATABASE_URL found, running migrations...");
  try {
    execSync("npx drizzle-kit migrate", { stdio: "inherit" });
    console.log("Migrations applied successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
} else {
  console.log("DATABASE_URL not found, skipping database migrations.");
}
