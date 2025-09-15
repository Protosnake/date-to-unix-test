import assert from "assert";
import { Locator, Page } from "playwright";
import { expect } from "playwright/test";

export type Scope = Page | Locator;

export default abstract class Component {
  locator: Locator;
  expect = expect;

  constructor(protected scope: Scope, protected selector: string) {
    this.locator = this.scope.locator(this.selector);
  }

  async isVisible() {
    await this.expect(this.locator).toBeVisible();
  }

  async hasText(text: string | RegExp | undefined | null) {
    assert(text, "Text is not provided");
    await this.expect(this.locator).toHaveText(text);
  }

  async hasClass(className: string) {
    await this.expect(this.locator).toHaveClass(
      new RegExp(className.toString())
    );
  }

  async hasNoClass(className: string | undefined | null | RegExp) {
    assert(className, "className is not provided");
    await this.expect(this.locator).not.toHaveClass(
      new RegExp(className.toString())
    );
  }
}
