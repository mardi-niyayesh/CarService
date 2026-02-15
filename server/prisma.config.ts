import "dotenv/config";
import {defineConfig, env} from "prisma/config";

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations'
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
