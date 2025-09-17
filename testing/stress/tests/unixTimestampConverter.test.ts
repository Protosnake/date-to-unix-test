import { check, group, sleep } from "k6";
import UnixTimestampConverter from "../routes/unixTimestampConverter";

export const options = {
  vus: 10,
  duration: "10s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<500"],
    http_reqs: ["rate>1"],
  },
};

const testCases = [
  {
    name: "Valid Date to Timestamp",
    input: "2016-01-01 02:03:22",
    expectedBody: "1451613802",
  },
  {
    name: "Valid Timestamp to Date",
    input: "1451613802",
    expectedBody: '"2016-01-01 02:03:22"',
  },
  {
    name: "Invalid Input String",
    input: "asdfasd",
    expectedBody: "false",
  },
];

export default function () {
  const converter = new UnixTimestampConverter();
  for (const testCase of testCases) {
    // Use group() to organize results for each test case
    group(testCase.name, () => {
      const res = converter.convert(testCase.input);
      check(res, {
        "status is 200 OR 429": (r) => r.status === 200 || r.status === 429,
        // Verify the response body, but only if the request was successful (not rate-limited).
        "body is correct on success": (r) => {
          if (r.status === 200) {
            return r.body === testCase.expectedBody;
          }
          // If we were rate-limited, this check passes automatically.
          return true;
        },
      });
    });

    sleep(5);
  }
}
