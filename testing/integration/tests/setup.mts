import assert from "assert";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

export async function globalSetup() {
  // ESM way to get the current directory
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Construct a reliable, absolute path to the .env file
  const envPath = path.resolve(__dirname, "../../.env");

  dotenv.config({ path: envPath });

  assert(process.env.API_URL, "API_URL is not set in .env file");
}
