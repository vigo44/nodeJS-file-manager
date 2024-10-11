import { homedir } from "os";
import { join, dirname, normalize, isAbsolute, parse } from "path";
import { stat, readdir } from "fs/promises";
import { consoleErrors } from "../errors/errors.js";

class Navigation {
  constructor(startPath) {
    this.currentPath = startPath;
  }
  readPath() {
    return this.currentPath;
  }
  async cd(path) {
    try {
      const pathNormolized = normalize(path);
      if (isAbsolute(pathNormolized)) {
        if (await this.#pathExists(pathNormolized)) {
          this.currentPath = pathNormolized;
        } else {
          throw new Error();
        }
      } else {
        const absolutePath = join(this.currentPath, pathNormolized);
        if (await this.#pathExists(absolutePath)) {
          this.currentPath = absolutePath;
        } else {
          throw new Error();
        }
      }
      return this.currentPath;
    } catch {
      consoleErrors.operation();
    }
  }
  up() {
    try {
      if (this.currentPath === parse(process.cwd()).root)
        return this.currentPath;
      this.currentPath = dirname(this.currentPath);
      return this.currentPath;
    } catch {
      consoleErrors.operation();
    }
  }
  async ls() {
    try {
      const items = await readdir(this.currentPath, {
        withFileTypes: true,
      });

      const orderTypes = ["directory", "file"];
      const lists = items
        .map((item) => {
          let type = "other";
          if (item.isDirectory()) {
            type = "directory";
          }
          if (item.isFile()) {
            type = "file";
          }
          return { name: item.name, type };
        })
        .filter((elem) => orderTypes.includes(elem.type))
        .sort((a, b) => {
          const orderA = orderTypes.findIndex((elem) => elem === a.type);
          const orderB = orderTypes.findIndex((elem) => elem === b.type);
          if (orderA !== orderB) {
            return orderA - orderB;
          } else {
            return a.name.localeCompare(b.name);
          }
        });
      if (lists.length > 0) {
        console.table(lists);
      } else {
        console.log("\u001b[32mThe folder is empty\u001b[0m");
      }
    } catch {
      consoleErrors.operation();
    }
  }

  async #pathExists(path) {
    return await stat(path)
      .then(() => true)
      .catch(() => false);
  }
}

export const navigation = new Navigation(homedir());
