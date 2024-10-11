class ConsoleErrors {
  operation() {
    console.log("\u001b[41mOperation failed\u001b[0m");
  }
  input() {
    console.log("\u001b[41mInvalid input\u001b[0m");
  }
}

export const consoleErrors = new ConsoleErrors();
