import assert from "assert";
import ApiClient from "../../shared/ApiClient.js";

export default class UnixTimestampConverter extends ApiClient {
  constructor(baseUrl?: string | undefined) {
    assert(baseUrl, `BASE_URL is not provided, please set it in .env file`);
    super(`${baseUrl}/unix-timestamp-converter/?cached&s=`);
  }

  async convertDateToUnix(dateStr: string): Promise<string> {
    const res = await this.get<string>(
      this.baseUrl + `&s=${encodeURIComponent(dateStr)}`
    );
    return res;
  }

  async convertUnixToDate(timestamp: string): Promise<string> {
    const res = await this.get<string>(
      this.baseUrl + `&s=${encodeURIComponent(timestamp)}`
    );
    return res;
  }
}
