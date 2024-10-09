import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const App = async () => {
  const rl = createInterface({ input: stdin, output: stdout });
  console.log(`Welcome to the File Manager, _______!`); //todo
  rl.prompt();
  rl.on("line", async (line) => {
    console.log(`Echo: ${line}`);
    rl.prompt();
  }).on("close", () => {
    console.log(`Thank you for using File Manager, ______, goodbye!`); //todo
  });
};

await App();
