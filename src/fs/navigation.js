import { homedir } from "os";
import { join, dirname, normalize, isAbsolute, parse } from "path";
import { stat } from "fs/promises";
import { consoleErrors } from "../errors/errors.js";

class Navigation {
  constructor(startPath) {
    this.currentPath = startPath;
  }
  readPath() {
    return this.currentPath;
  }
  async cd(path) {
    const pathNormolized = normalize(path);
    if (isAbsolute(pathNormolized)) {
      if (await this.#pathExists(pathNormolized)) {
        this.currentPath = pathNormolized;
      } else {
        consoleErrors.operation();
      }
    } else {
      const absolutePath = join(this.currentPath, pathNormolized);
      if (await this.#pathExists(absolutePath)) {
        this.currentPath = absolutePath;
      } else {
        consoleErrors.operation();
      }
    }
    return this.currentPath;
  }
  up() {
    if (this.currentPath === parse(process.cwd()).root) return this.currentPath;
    this.currentPath = dirname(this.currentPath);
    return this.currentPath;
  }
  async #pathExists(path) {
    return await stat(path)
      .then(() => true)
      .catch(() => false);
  }
}

export const navigation = new Navigation(homedir());
