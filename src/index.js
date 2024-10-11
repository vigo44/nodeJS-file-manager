import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { parseUsername } from "./common/parseUsername.js";
import { navigation } from "./fs/navigation.js";
import { handlerCommandLine } from "./common/handlerCommandLine.js";

const App = async () => {
  const rl = createInterface({ input: stdin, output: stdout });
  console.log(`Welcome to the File Manager, ${parseUsername()}!`);
  console.log(`You are currently in ${navigation.readPath()}`);
  rl.setPrompt("\u001b[33m>>\u001b[0m ");
  rl.prompt();
  const handlerClose = () => {
    rl.close();
  };
  rl.on("line", async (line) => {
    if (await handlerCommandLine(line, handlerClose)) {
      console.log(`You are currently in ${navigation.readPath()}`);
      rl.prompt();
    }
  }).on("close", () => {
    console.log(
      `Thank you for using File Manager, ${parseUsername()}, goodbye!`
    );
  });
};

App();
