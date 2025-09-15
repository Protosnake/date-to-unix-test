import Button from "../components/Button";
import RadioButton from "../components/RadioButton";
import Result from "../components/Result";
import TextInput from "../components/TextInput";
import Page from "./Page";

export default class extends Page {
  constructor(page: Page["page"]) {
    super(page, "/");
  }

  get valueTextInput() {
    return new TextInput(this.page, "#inputValue");
  }
  get dateToUnixRadioButton() {
    return new RadioButton(this.page, "input[value=toTimestamp]");
  }
  get unixToDateRadioButton() {
    return new RadioButton(this.page, "input[value=toDate]");
  }
  get convertButton() {
    return new Button(this.page, "button[type=submit]");
  }
  get result() {
    return new Result(this.page, "#result");
  }

  async convert() {
    await this.convertButton.hasText("Convert");
    await this.convertButton.click();
    return this;
  }
}
