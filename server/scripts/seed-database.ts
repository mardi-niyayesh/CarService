import {execSync} from "child_process";
import * as readline from "node:readline";
import {stdin as input, stdout as output} from "node:process";

async function main(): Promise<void> {
  const rl: readline.Interface = readline.createInterface({input, output});

  try {
    const dbName = rl.question("Enter database name: ");
    const output: string = execSync("ls -la", {
      encoding: "utf8"
    });
    console.log('✅ stdout execSync:');
    console.log(output);
  } catch (e) {
    console.log((e as Error).message);
    process.exit(1);
  }
}

main()
  .then()
  .catch(e => console.log(e));