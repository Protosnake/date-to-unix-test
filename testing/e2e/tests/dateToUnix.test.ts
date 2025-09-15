import { test } from "@playwright/test";
import { describe } from "node:test";
import UnixTimestampConverter from "../pages/UnixTimestampConverter";

test.describe("Date to Unix converter", () => {
  test("should convert date string to unix timestamp", async ({ page }) => {
    await new UnixTimestampConverter(page)
      .visit()
      .then(async (converterPage) => {
        await converterPage.valueTextInput.type("2016-01-01 02:03:22");
        await converterPage.dateToUnixRadioButton.isChecked();
        await converterPage.convert();
        await converterPage.result.is("1451613802");
      });
  });
  test("should convert unix timestamp to date string", async ({ page }) => {
    await new UnixTimestampConverter(page)
      .visit()
      .then(async (converterPage) => {
        await converterPage.valueTextInput.type("1451613802");
        await converterPage.unixToDateRadioButton.check();
        await converterPage.convert();
        await converterPage.result.is("2016-01-01 02:03:22");
      });
  });
  test("should return an error for invalid date string", async ({ page }) => {
    await new UnixTimestampConverter(page)
      .visit()
      .then(async (converterPage) => {
        await converterPage.valueTextInput.type("asdfasd");
        await converterPage.dateToUnixRadioButton.isChecked();
        await converterPage.convert();
        await converterPage.result.hasText(
          "Error: Invalid date string format. Use YYYY-MM-DD or YYYY-MM-DD HH:MM:SS."
        );
        await converterPage.result.isError();
      });
  });
  test("should return an error for invalid unix timestamp", async ({
    page,
  }) => {
    await new UnixTimestampConverter(page)
      .visit()
      .then(async (converterPage) => {
        await converterPage.valueTextInput.type("asdfasd");
        await converterPage.unixToDateRadioButton.check();
        await converterPage.convert();
        await converterPage.result.hasText(
          "Error: Invalid timestamp. Please enter a valid number."
        );
        await converterPage.result.isError();
      });
  });
});
