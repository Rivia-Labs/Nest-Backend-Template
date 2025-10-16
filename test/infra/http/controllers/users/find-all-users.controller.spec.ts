import type { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { IntegrationTestHelper } from "../../../../support/integration-test-helper";

describe("UserController (Integration)", () => {
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

	describe("GET /users", () => {
		it("should return empty array when no users exist", async () => {
			const response = await request(app.getHttpServer()).get("/users").expect(200);

			expect(response.body).toEqual([]);
		});

		it("should return all users", async () => {
			const createUserDto = {
				email: "duplicate@example.com",
				name: "First User",
				age: 25,
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(201);
			const response = await request(app.getHttpServer()).get("/users").expect(200);

			expect(response.body).toHaveLength(1);
			expect(response.body[0]).toMatchObject({
				id: expect.any(String),
				email: expect.any(String),
				name: expect.any(String),
				isActive: expect.any(Boolean),
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
			});
		});
	});
});
