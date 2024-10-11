import { consoleErrors } from "../errors/errors.js";
import { navigation } from "../fs/navigation.js";

export const handlerCommandLine = async (line, handlerClose) => {
  const [command, arg] = line.split(" ");
  switch (command) {
    case "up":
      navigation.up();
      break;
    case "cd":
      await navigation.cd(arg);
      break;
    case ".exit":
      handlerClose();
      return false;
      break;
    default:
      consoleErrors.input();
      break;
  }
  return true;
};
