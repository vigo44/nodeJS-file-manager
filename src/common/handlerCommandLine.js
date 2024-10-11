import { consoleErrors } from "../errors/errors.js";
import { navigation } from "../fs/navigation.js";

export const handlerCommandLine = async (line, handlerClose) => {
  const [command, arg, ...args] = line.split(" ");
  const argWithSpace = [arg, ...args].join(" ");
  switch (command) {
    case "up":
      navigation.up();
      break;
    case "cd":
      await navigation.cd(argWithSpace);
      break;
    case "ls":
      await navigation.ls();
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
