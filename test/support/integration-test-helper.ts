import type { INestApplication, Type } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";

import { AppModule } from "@/app.module";
import { PrismaClient } from "@/infra/database/prisma/generated/prisma/client";

export interface IntegrationTestSetupWithDatabase {
	app: INestApplication;
}

export class IntegrationTestHelper {
	private static prisma: PrismaClient;

	static async withDatabase(): Promise<IntegrationTestSetupWithDatabase> {
		const connectionString = process.env.TEST_DATABASE_URL;

		if (!connectionString) {
			throw new Error(
				"Database connection string not found. Make sure global setup is configured."
			);
		}

		if (!IntegrationTestHelper.prisma) {
			IntegrationTestHelper.prisma = new PrismaClient({
				datasources: {
					db: {
						url: connectionString,
					},
				},
			});
			await IntegrationTestHelper.prisma.$connect();
		}

		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		const app = moduleFixture.createNestApplication();

		await app.init();

		return { app };
	}

	static async withoutDatabase(moduleToTest?: Type): Promise<INestApplication> {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [moduleToTest || AppModule],
		}).compile();

		const app = moduleFixture.createNestApplication();

		await app.init();

		return app;
	}

	static async teardown(app: INestApplication): Promise<void> {
		if (app) {
			await app.close();
		}
	}

	static async cleanup(): Promise<void> {
		if (IntegrationTestHelper.prisma) {
			await IntegrationTestHelper.prisma.audit.deleteMany();
			await IntegrationTestHelper.prisma.user.deleteMany();
		}
	}

	// static async forceCleanup(): Promise<void> {
	// 	if (IntegrationTestHelper.prisma) {
	// 		await IntegrationTestHelper.prisma.$disconnect();
	// 		IntegrationTestHelper.prisma = null;
	// 	}
	// }
}
