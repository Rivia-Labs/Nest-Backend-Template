import type { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { IntegrationTestHelper } from "../../../../support/integration-test-helper";

describe("AuditController (Integration)", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const setup = await IntegrationTestHelper.withDatabase();
		app = setup.app;
	}, 120000);

	afterAll(async () => {
		await IntegrationTestHelper.teardown(app);
	});

	beforeEach(async () => {
		await IntegrationTestHelper.cleanup();
	});

	describe("GET /audits", () => {
		it("should return empty array when no audits exist", async () => {
			const response = await request(app.getHttpServer()).get("/audits").expect(200);

			expect(response.body).toEqual([]);
		});

		it("should return all audits", async () => {
			const createUserDto = {
				email: "duplicate@example.com",
				name: "First User",
				age: 25,
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(201);
			const response = await request(app.getHttpServer()).get("/audits").expect(200);

			expect(response.body).toHaveLength(1);
			expect(response.body[0]).toMatchObject({
				id: expect.any(Number),
				action: "create",
				userId: expect.any(String),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			});
		});
	});
});
