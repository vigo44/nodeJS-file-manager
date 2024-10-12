import { navigation } from "./navigation.js";
import { consoleErrors } from "../errors/errors.js";
import { stdout } from "node:process";
import { access, writeFile, rename, unlink } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { EOL } from "node:os";
import { checkRequiredArg, parseTwoArg } from "../utils/parseArgs.js";
import { dirname, join, parse } from "path";
import { pipeline } from "stream/promises";

export class BasicOperations {
  cat(path) {
    return new Promise(async (resolve) => {
      try {
        checkRequiredArg(path);
        const sourcePath = navigation.convertToAbsolutePath(path);
        await access(sourcePath);
        const sourceStream = createReadStream(sourcePath);
        sourceStream.on("data", (chunk) => stdout.write(chunk));
        sourceStream.on("close", () => {
          stdout.write(EOL);
          resolve();
        });
      } catch ({ message }) {
        consoleErrors(message);
        resolve();
      }
    });
  }
  async addNewFile(name) {
    try {
      checkRequiredArg(name);
      const sourcePath = navigation.convertToAbsolutePath(name);
      await writeFile(sourcePath, "", { flag: "wx" });
    } catch ({ message }) {
      consoleErrors(message);
    }
  }

  async renameFile(args) {
    try {
      const [path, newName] = parseTwoArg(args);
      const sourcePath = navigation.convertToAbsolutePath(path);
      const dirName = dirname(sourcePath);
      const renamePath = join(dirName, newName);
      await access(sourcePath);
      try {
        await access(renamePath);
        throw new Error("newNameExists");
      } catch (err) {
        if (err.message === "newNameExists") {
          throw new Error("newNameExists");
        }
      }
      await rename(sourcePath, renamePath);
    } catch ({ message }) {
      consoleErrors(message);
    }
  }

  async copyFile(args) {
    try {
      const [file, folder] = parseTwoArg(args);
      const sourcePath = navigation.convertToAbsolutePath(file);
      const folderPath = navigation.convertToAbsolutePath(folder);
      const fileName = parse(sourcePath).base;
      const copyPath = join(folderPath, fileName);
      await access(sourcePath);
      const sourceStream = createReadStream(sourcePath);
      const copyStream = createWriteStream(copyPath);
      await pipeline(sourceStream, copyStream);
      return true;
    } catch ({ message }) {
      consoleErrors(message);
      return false;
    }
  }
  async deleteFile(path) {
    try {
      checkRequiredArg(path);
      const sourcePath = navigation.convertToAbsolutePath(path);
      await unlink(sourcePath);
    } catch ({ message }) {
      consoleErrors(message);
    }
  }
  async moveFile(args) {
    try {
      const [file, _] = parseTwoArg(args);
      const success = await this.copyFile(args);
      if (success) await this.deleteFile(file);
    } catch ({ message }) {
      consoleErrors(message);
    }
  }
}
