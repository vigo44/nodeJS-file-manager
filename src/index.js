import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { parseUsername } from "./common/parseUsername.js";

const App = async () => {
  const rl = createInterface({ input: stdin, output: stdout });
  console.log(`Welcome to the File Manager, ${parseUsername()}!`);
  rl.prompt();
  rl.on("line", async (line) => {
    console.log(`Echo: ${line}`);
    rl.prompt();
  }).on("close", () => {
    console.log(
      `Thank you for using File Manager, ${parseUsername()}, goodbye!`
    );
  });
};

await App();
