import { exec } from "node:child_process";
import { promisify } from "node:util";
import { PostgreSqlContainer } from "@testcontainers/postgresql";

const execAsync = promisify(exec);

export default async function globalSetup(): Promise<void> {
	const container = await new PostgreSqlContainer("postgres:15-alpine")
		.withDatabase("testdb")
		.withUsername("testuser")
		.withPassword("testpass")
		.withExposedPorts(5432)
		.start();

	const connectionString = container.getConnectionUri();

	process.env.DATABASE_URL = connectionString;
	process.env.TEST_DATABASE_URL = connectionString;

	await execAsync(`npx prisma db push --skip-generate`, {
		env: { ...process.env, DATABASE_URL: connectionString },
	});
}
