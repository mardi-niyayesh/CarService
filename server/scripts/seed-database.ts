import {execSync} from "child_process";
import * as readline from "node:readline/promises";
import {stdin as input, stdout as output} from "node:process";

async function main(): Promise<void> {
  const rl: readline.Interface = readline.createInterface({input, output});

  try {
    console.log("========================");
    console.log("Welcome to Creating Database and Collation");
    console.log("========================");
    let dbName: string = await rl.question("Enter Database name (default = car_service): ").then(s => s.trim()) || "car_service";
    const userName: string = await rl.question("Enter Database username (default = postgres): ").then(s => s.trim()) || "postgres";

    // check DB connected
    try {
      execSync(`psql -U ${userName} -c "SELECT 1"`, {stdio: "pipe"});
      console.log("✅ Connected to PostgreSQL");
    } catch (_) {
      console.log("❌ Cannot connect to PostgreSQL. Check if it's running and username/password is correct.");
      process.exit(1);
    }

    try {
      const checkDB = `psql -U ${userName} -lqt | cut -d \\| -f | grep -w ${dbName}`;
      const exist: string = execSync(checkDB, {encoding: "utf8"}).trim();

      if (exist) {

      } else {
        console.log("❌ Cancelled.");
        process.exit(0);
      }
    } catch (e) {
      console.log((e as Error).message || "❌ Something went wrong.");
      process.exit(1);
    }

    const createDB = `psql -U ${userName} -c "CREATE DATABASE ${dbName} ENCODING 'UTF8' LC_COLLATE 'en_US.UTF8' LC_CTYPE 'en_US.UTF8'"`;

    execSync(createDB, {
      encoding: "utf8",
      stdio: "pipe"
    });

    console.log("✅ Database created successfully!");
    console.log("🔧 Creating collations...");

    const collate1 = `psql -U ${userName} -d ${dbName} -c "CREATE COLLATION IF NOT EXISTS \\"ar_SA.utf8\\" (LOCALE = 'ar_SA.utf8');"`;
    const collate2 = `psql -U ${userName} -d ${dbName} -c "CREATE COLLATION IF NOT EXISTS \\"ar_SA\\" (LOCALE = 'ar_SA.utf8');"`;

    execSync(collate1, {stdio: "inherit"});
    execSync(collate2, {stdio: "inherit"});

    console.log("✅ Collations created!");
    console.log("\n🎉 All done!");
    process.exit(0);
  } catch (e) {
    console.log((e as Error).message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main()
  .catch(e => console.log(e));