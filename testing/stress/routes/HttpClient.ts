import http from "k6/http";

// A simple HTTP client wrapper to allow easier maintenance in the future
// if we need to add headers, authentication, etc.
// or decide to switch to another HTTP client library.
// Currently, it just forwards calls to k6's http module.
export default class HttpClient {
  url: string;
  constructor(protected route: string) {
    const baseUrl = __ENV.API_URL;
    if (!baseUrl) {
      throw new Error(`BASE_URL is not provided, please set it in .env file`);
    }
    this.url = `${baseUrl}${route}`;
  }
  get(...args: Parameters<typeof http.get>) {
    return http.get(...args);
  }
  post(...args: Parameters<typeof http.post>) {
    return http.post(...args);
  }
}
