import HttpClient from "./HttpClient";

export default class UnixTimestampConverter extends HttpClient {
  constructor() {
    super("unix-timestamp-converter");
  }
  // A single, reusable method for conversion is cleaner.
  convert(value: string) {
    // The full query string is built here, which is safer and less error-prone.
    return this.get(`${this.url}/?cached&s=${encodeURIComponent(value)}`);
  }
}
