
# BookDex - Automatic Testing Source Code

This repository contains the source code for the automatic testing of the BookDex application.

## Overview

The project uses **Jest** for unit testing and **Puppeteer** for end-to-end testing of the BookDex web application. The tests are designed to ensure the proper functioning of the app's features and to verify the correctness of various functionalities.

For detailed information about the BookDex project, visit the official repository: [BookDex GitHub Repository](https://github.com/iKyel/BookDex).

## Tools and Libraries Used

- **Jest**: A delightful JavaScript testing framework used for unit testing.
- **Puppeteer**: A Node library that provides a high-level API to control Chrome or Chromium over the DevTools Protocol, used for end-to-end testing.

## Installation

To install the necessary dependencies for running the tests, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/iKyel/AutoTest-using-Jest-and-puppeteer.git
   cd AutoTest-using-Jest-and-puppeteer
   ```

2. Install the required modules:

   ```bash
   npm install
   ```

## Running Tests

To run the tests for the BookDex application:

   ```bash
   npx jest validation.test.ts
   npx jest behavior.test.ts
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to the authors of Jest and Puppeteer for providing excellent tools for testing.
