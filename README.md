# Description

A simple monorepo project with a frontend and a handful of testing modules.

# Frontend

A JS application that wraps around https://helloacm.com/tools/unix-timestamp-converter/ API. More details in the [frontend README](./frontend/README.md).

# Testing

The testing modules are located in the `./testing` directory and include:

- End-to-end (e2e) tests using Playwright. More details in the [e2e README](./testing/e2e/README.md).
- Integration tests using NodeJS test runner. More details in the [integration README](./testing/integration/README.md).
- Stress tests using k6. More details in the [stress README](./testing/stress/README.md).

Each testing module has its own README file with instructions on how to set up and run the tests.

# Installation

To install root dependencies, run the following commands in the root directory:  
`nvm use` or `nvm install` if you don't have the right version.  
`npm install`

Then, navigate to each sub-module directory and run `npm install` to install their specific dependencies and follow the instructions in their respective README files.

# Running Tests

Each testing module can be run independently by navigating to its directory and following the instructions in its README file.
But you can also run all tests from the root directory using the following commands:
`npm run test:e2e`
`npm run test:integration`
`npm run test:stress`
Make sure to have the necessary environment variables set up in a `.env` file in the root directory as specified in each testing module's README.

# Environment Variables

Each testing module may require specific environment variables to be set. Refer to the respective README files for details on the required variables and their configurations. Use the `.env.example` files as references.

# Strategy & Improvements

## On scaling test automation across services

- Adopt monorepo structure to share common utilities, components, and configurations.
- Use containerization (Docker) to ensure consistent test environments.
- Implement CI/CD pipelines to automate test execution on code changes. (Haven't done this as it is way out of scope for this exercise)
- Modularize tests to allow easy addition of new services and test cases.
- We could've adopted bundling tools like turborepo or nx to optimize test runs, but it felt overkill for this exercise.

## On avoiding flakiness and ensuring test reliability

- Use stable selectors and avoid relying on dynamic content in e2e tests. If I wasn't controlling frontend, I would use `data-testid` attributes for stable selectors.
- Choose playwright as it has auto-waiting mechanisms to handle async operations.
- Allow passing environment variables to configure timeouts and retries.
- Regularly review and refactor tests to remove redundant or flaky tests.

## On balancing unit/integration/E2E tests

- It is an ongoin effort. There's no one-size-fits-all solution, but everyone in the org should be aware of the testing pyramid and the importance of each type of test.
  However, we reduced maintenance cost by using same file names across unit/integration/E2E tests to make it easy to find and relate tests.

## On ensuring smart test coverage in a growing org

- Use code coverage tools to identify untested areas of the codebase. (not in the scope of this exercise)
- Use the same reporting tool across all testing modules to have a unified view of test coverage. (not in the scope of this exercise)

## On suggesting how this API could be improved from a testing or reliability point of view

- For testing it would be beneficial to be able to deactivate rate limiting and have a sandbox environment.
- For reliability, the API could provide more detailed error messages and status codes to help identify issues, but `false` works well enough for this exercise.
- Allow disabling caching for testing purposes, especially for stress tests.
