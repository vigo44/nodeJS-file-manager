export function consoleErrors(type) {
  switch (type) {
    case "operation":
      console.log("\u001b[41mOperation failed\u001b[0m");
      break;
    case "needQuotation":
      console.log(
        '\u001b[41mInvalid input\u001b[0m \u001b[31mIf there are spaces in arguments, please, use quotation (e.g.: "./new folder")\u001b[0m'
      );
      break;
    case "oneArg":
      console.log(
        "\u001b[41mInvalid input\u001b[0m \u001b[31mOne argument is required\u001b[0m"
      );
      break;
    case "twoArgs":
      console.log(
        "\u001b[41mInvalid input\u001b[0m \u001b[31mTwo arguments are required\u001b[0m"
      );
      break;
    case "newNameExists":
      console.log(
        "\u001b[41mOperation failed\u001b[0m \u001b[31mNew name exists\u001b[0m"
      );
      break;
    case "input":
      console.log("\u001b[41mInvalid input\u001b[0m");
      break;
    default:
      console.log("\u001b[41mOperation failed\u001b[0m");
      break;
  }
}
