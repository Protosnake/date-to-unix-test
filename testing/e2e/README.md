# e2e tests

This is a sub-module that contains end-to-end (e2e) tests for the testing Unix to Date converter application. These tests are designed to simulate real user interactions and verify that the application behaves as expected.

## Prerequisites

In order to run the e2e tests you need to:
-- have a [running frontend server](../../frontend/README.md)
-- have a .env file in the root directory with the following variables:

```
FRONTEND_URL=http://localhost:3000
```

Use .env.example as a reference.

## Installation

`nvm use` or `nvm install` if you don't have the right version

`npm install`

## Running the Tests

`npm run test`

## Reports

The test results are saved in the `playwright-report` directory. You can open the report by running:
`npx playwright show-report` in the frontend directory.
