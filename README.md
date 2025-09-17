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
`nvm use` or `nvm install` if you don't have the right version
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

Bonus: Strategy & Improvements

- Include a short doc describing your approach to:
- Scaling test automation across services
- Avoiding flakiness and ensuring test reliability
- Balancing unit/integration/E2E tests
- Ensuring smart test coverage in a growing org
- Suggest how this API could be improved from a testing or reliability point of
  view
