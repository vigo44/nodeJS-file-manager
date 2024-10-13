import { EOL, cpus, homedir, userInfo, arch } from "node:os";

export class SystemInfoOperations {
  eol() {
    console.log(JSON.stringify(EOL).split('"').join(""));
  }
  cpus() {
    console.log(`Overall amount of CPUS: ${cpus().length}`);
    console.table(
      cpus().map((item) => ({
        model: item.model.trim(),
        ["clock rate"]: `${item.speed / 1000}GHz`,
      }))
    );
  }
  homeDir() {
    console.log(homedir());
  }
  username() {
    console.log(userInfo().username);
  }
  architecture() {
    console.log(arch());
  }
}
