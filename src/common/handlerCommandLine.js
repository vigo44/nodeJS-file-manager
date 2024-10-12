import { consoleErrors } from "../errors/errors.js";
import { BasicOperations } from "../fs/basicOperations.js";
import { navigation } from "../fs/navigation.js";

export const handlerCommandLine = async (line, rl) => {
  const handlerClose = () => {
    rl.close();
  };
  const basicOperations = new BasicOperations();
  const [command, arg, ...args] = line.trim().split(" ");
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
    case "cat":
      await basicOperations.cat(argWithSpace);
      break;
    case "add":
      await basicOperations.addNewFile(argWithSpace);
      break;
    case "rn":
      await basicOperations.renameFile(argWithSpace);
      break;
    case "cp":
      await basicOperations.copyFile(argWithSpace);
      break;
    case "mv":
      await basicOperations.moveFile(argWithSpace);
      break;
    case "rm":
      await basicOperations.deleteFile(argWithSpace);
      break;
    case ".exit":
      handlerClose();
      return false;
      break;
    default:
      consoleErrors("input");
      break;
  }
  return true;
};
