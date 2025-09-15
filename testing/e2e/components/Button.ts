import Component from "./Component";

export default class extends Component {
  async click() {
    await this.locator.click();
    // TODO: add handling API response await
  }
}
