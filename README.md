# Description

A simple monorepo project with a frontend and a handful of testing modules.

# How to run everything using Docker

Make sure you have Docker and Docker Compose installed.  
`docker compose build --no-cache` should be run only once to build the images.  
`docker compose up -d` to start the services. Check `docker logs -f <service_name>` to see the logs of testing services.  
Alternatively, you can run each testing container individually using, doing `docker compose up <service_name>`.

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

## Test strategy and architecture decisions

- I chose to work with a monorepo structure to keep all related code in one place, making it easier to manage and share resources.
- Each testing module is isolated in its own directory with its own dependencies to avoid conflicts and ensure modularity.
- I used Docker to containerize the testing environments, ensuring consistency across different setups and simplifying the setup process.
- I selected Playwright for e2e testing due to its robust features, including auto-waiting and cross-browser support.
- I used NodeJS test runner for integration tests for its simplicity and ease of use with JavaScript/TypeScript. Depending on the complexity of the project, Jest, Vitest or Mocha could be better alternatives
- I chose k6 for stress testing due to its performance and ease of use with JavaScript.
- I implemented environment variable management using `.env` files to keep sensitive information and configurations separate from the codebase.

## Intentional trade-offs

- Some architecture decisions are overkill, but I still went with them for demonstration purposes.
- Relative path for .env files is not the best approach, but it works for this exercise.
- I didn't implement CI/CD pipelines as it is out of scope for this exercise.
- No testing reporters are implemented, but it could be added easily as we're exporting test results for each testing module.
- Some code duplication across stress and integration testing modules, definitely could be improved by moving them to a `testing` directory.
- Existence of `testing` directory in the root might be confusing, but it is intentional to separate it from `frontend` directory.
- NodeJS test runner is not as feature-rich as Jest or Mocha, but it is simple and works well for this exercise.
- No mocking or stubbing is implemented as there's no complex dependencies to mock.
- Hardcoded env variables into docker-compose file in order to simplify usage and setup, especially for local development. Not the best practice, but works for this exercise.

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
- Add tools like ESLint, Prettier, and Husky to enforce code quality and consistency across the codebase.

## On balancing unit/integration/E2E tests

- It is an ongoing effort. There's no one-size-fits-all solution, but everyone in the org should be aware of the testing pyramid and the importance of each type of test.
  However, we reduced maintenance cost by using same file names across unit/integration/E2E tests to make it easy to find and relate tests.

## On ensuring smart test coverage in a growing org

- Use code coverage tools to identify untested areas of the codebase. (not in the scope of this exercise)
- Use the same reporting tool across all testing modules to have a unified view of test coverage. (not in the scope of this exercise)

## On suggesting how this API could be improved from a testing or reliability point of view

- For testing it would be beneficial to be able to deactivate rate limiting and have a sandbox environment.
- For reliability, the API could provide more detailed error messages and status codes to help identify issues, but `false` works well enough for this exercise.
- Allow disabling caching for testing purposes, especially for stress tests.
