import assert from "assert";
import dotenv from "dotenv";

export async function globalSetup() {
  dotenv.config({ path: "../../.env" });
  assert(process.env.API_URL, "API_URL is not set in .env file");
}
