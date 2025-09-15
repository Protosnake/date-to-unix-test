import assert from "assert";
import Component from "./Component";

export default class extends Component {
  async is(text: string | undefined | null) {
    assert(text, "text is not provided");
    await this.expect(this.locator).toBeVisible();
    await this.hasText(text);
    await this.hasNoClass("error");
  }
  async hasError(text: string) {
    await this.hasClass("error");
    await this.hasText(text);
  }
  async isError() {
    await this.hasClass("error");
  }
}
