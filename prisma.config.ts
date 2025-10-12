import "dotenv/config";

import path from "node:path";
import { defineConfig } from "prisma/config";

const schema = "src/infra/database/prisma";

export default defineConfig({
	schema: path.join(schema, "schema.prisma"),
	migrations: {
		path: path.join(schema, "migrations/schema.prisma"),
		// seed: "tsx --env-file .env ./src/infra/database/prisma/seed.ts",
	},
});
