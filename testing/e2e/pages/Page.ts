import { Page as PlatwrightPage } from "playwright";

export default abstract class Page {
  constructor(
    protected readonly page: PlatwrightPage,
    protected readonly url: string
  ) {}

  async visit(): Promise<this> {
    await this.page.goto(this.url);
    return this;
  }
}
