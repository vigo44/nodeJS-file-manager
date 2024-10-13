import { checkRequiredArg } from "../utils/parseArgs.js";
import { consoleErrors } from "../errors/errors.js";
import { SystemInfoOperations } from "./systemInfoOperations.js";

export function handlerSystemInfoOperations(arg) {
  try {
    const systemInfoOperations = new SystemInfoOperations();
    checkRequiredArg(arg);
    switch (arg) {
      case "--EOL":
        systemInfoOperations.eol();
        break;
      case "--cpus":
        systemInfoOperations.cpus();
        break;
      case "--homedir":
        systemInfoOperations.homeDir();
        break;
      case "--username":
        systemInfoOperations.username();
        break;
      case "--architecture":
        systemInfoOperations.architecture();
        break;
      default:
        consoleErrors("input");
        break;
    }
  } catch ({ message }) {
    consoleErrors(message);
  }
}
