import { parseTwoArg } from "../utils/parseArgs.js";
import { consoleErrors } from "../errors/errors.js";
import { navigation } from "../fs/navigation.js";
import { join, parse } from "path";
import { pipeline } from "stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { access } from "node:fs/promises";

export async function compress(args, option) {
  const reverse = option?.reverse ?? false;
  try {
    const [file, destination] = parseTwoArg(args);
    const sourcePath = navigation.convertToAbsolutePath(file);
    const destinationPath = navigation.convertToAbsolutePath(destination);
    const newName = reverse
      ? parse(sourcePath).base.replace(/.br$/, "")
      : `${parse(sourcePath).base}.br`;
    const targetPath = join(destinationPath, newName);
    const compress = reverse
      ? createBrotliDecompress()
      : createBrotliCompress();
    await access(sourcePath);
    try {
      await access(targetPath);
      throw new Error("newNameExists");
    } catch (err) {
      if (err.message === "newNameExists") {
        throw new Error("newNameExists");
      }
    }
    const readStream = createReadStream(sourcePath);
    const writeStream = createWriteStream(targetPath);
    await pipeline(readStream, compress, writeStream);
  } catch ({ message }) {
    consoleErrors(message);
  }
}
