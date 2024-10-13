import { createHash } from "crypto";
import { createReadStream } from "node:fs";
import { pipeline } from "stream/promises";
import { consoleErrors } from "../errors/errors.js";
import { checkRequiredArg } from "../utils/parseArgs.js";
import { navigation } from "../fs/navigation.js";

export async function calculateHash(path) {
  const hash = createHash("sha256");
  try {
    checkRequiredArg(path);
    const sourcePath = navigation.convertToAbsolutePath(path);
    const sourceSream = createReadStream(sourcePath);
    await pipeline(sourceSream, hash);
    console.log(hash.digest("hex"));
  } catch ({ message }) {
    consoleErrors(message);
  }
}
