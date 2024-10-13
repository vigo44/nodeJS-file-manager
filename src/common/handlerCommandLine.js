import { consoleErrors } from "../errors/errors.js";
import { BasicOperations } from "../fs/basicOperations.js";
import { navigation } from "../fs/navigation.js";
import { handlerSystemInfoOperations } from "../os/handlerSystemInfoOperations.js";
import { calculateHash } from "../hash/calculateHash.js";
import { compress } from "../compress/compressOperations.js";

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
    case "os":
      handlerSystemInfoOperations(arg);
      break;
    case "hash":
      await calculateHash(argWithSpace);
      break;
    case "compress":
      await compress(argWithSpace);
      break;
    case "decompress":
      await compress(argWithSpace, { reverse: true });
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
