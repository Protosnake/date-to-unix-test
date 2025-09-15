import assert from "assert";
import { suite, test } from "node:test";
import UnixTimestampConverter from "../../routes/unixTimestampConverter.js";

void suite("Date to Unix coverter", () => {
  const converter = new UnixTimestampConverter(process.env.API_URL);

  void test("should convert date string to unix timestamp", async function () {
    const dateStr = "2016-01-01 02:03:22";
    await converter.convertDateToUnix(dateStr).then((res) => {
      assert.strictEqual(res, 1451613802);
    });
  });

  void test("should convert unix timestamp to date string", async function () {
    const timestamp = "1451613802";
    await converter.convertUnixToDate(timestamp).then((res) => {
      assert.strictEqual(res, "2016-01-01 02:03:22");
    });
  });

  void test("should return false for invalid date string", async function () {
    await converter.convertDateToUnix("asdfasd").then((res) => {
      assert.strictEqual(res, false);
    });
  });
});
