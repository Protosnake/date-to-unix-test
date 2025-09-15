# Integration tests

This is a sub-module that contains integration tests for the testing Unix to Date converter application. These tests are designed to verify that different parts of the application work together as expected.

## Prerequisites

In order to run the integration tests you need to:
-- ensure that you can access https://helloacm.com/tools/unix-timestamp-converter/
-- have a .env file in the root directory with the following variables:

```
API_URL=https://helloacm.com/tools/unix-timestamp-converter/
```

Use .env.example as a reference. This is an external service, so no need to run the API locally, but it might be rate-limited or unavailable at times.

## Installation

`nvm use` or `nvm install` if you don't have the right version
`npm install`

## Running the Tests

`npm run test`

## Reports

The test results are saved in the `reports` directory in JUnit XML format. You can find the report at `reports/junit.xml`.
To view the report, you can use any XML viewer or integrate it with your CI/CD pipeline for better visualization.
Locally you could use VSCode extension like "JUnit Viewer".
