import Component from "./Component";

// Slight overkill for this particular project, but only because radio button implemented in native HTML
// In real-world scenarios, radio buttons are often custom components that require more complex interactions and verifications
export default class extends Component {
  async check() {
    await this.locator.click();
    await this.isChecked();
  }

  async uncheck() {
    await this.locator.click();
    await this.isUnchecked();
  }

  async isChecked() {
    await this.expect(this.locator).toHaveAttribute("checked");
  }

  async isUnchecked() {
    await this.expect(this.locator).not.toHaveAttribute("checked");
  }
}
