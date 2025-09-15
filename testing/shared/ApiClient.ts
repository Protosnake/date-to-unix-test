export default abstract class ApiClient {
  constructor(protected baseUrl: string) {}

  protected async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`);
    if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);
    return res.json();
  }

  protected async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API request failed: ${res.statusText}`);
    return res.json();
  }
}
