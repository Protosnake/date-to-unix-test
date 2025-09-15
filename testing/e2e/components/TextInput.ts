import Component from "./Component";

export default class extends Component {
  async type(text: string) {
    await this.locator.fill(text);
  }

  async hasValue(value: string) {
    await this.expect(this.locator).toHaveValue(value);
  }
}
