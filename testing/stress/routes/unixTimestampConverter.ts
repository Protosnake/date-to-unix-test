import HttpClient from "./HttpClient.ts";

export default class UnixTimestampConverter extends HttpClient {
  // A single, reusable method for conversion is cleaner.
  convert(value: string) {
    // The full query string is built here, which is safer and less error-prone.
    const url = `${this.baseUrl}?cached&s=${encodeURIComponent(value)}`;
    return this.get(url);
  }
}
