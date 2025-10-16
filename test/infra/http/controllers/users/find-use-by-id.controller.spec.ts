import type { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { PrismaClient } from "@/infra/database/prisma/generated/prisma/client";
import { IntegrationTestHelper } from "../../../../support/integration-test-helper";

describe("UserController (Integration)", () => {
	let app: INestApplication;
	const prisma = new PrismaClient();

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

	describe("GET /users/:id", () => {
		it("should return a user by id", async () => {
			const createUserDto = {
				email: "test@example.com",
				name: "Test User",
				age: 25,
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(201);
			const user = await prisma.user.findFirst({ where: { email: createUserDto.email } });
			const response = await request(app.getHttpServer()).get(`/users/${user.id}`).expect(200);
			expect(response.body).toEqual({
				id: user.id,
				email: createUserDto.email,
				name: createUserDto.name,
				age: createUserDto.age,
				createdAt: expect.any(String),
				updatedAt: expect.any(String),
				isActive: expect.any(Boolean),
			});
		});

		it("should return 404 when user is not found", async () => {
			const response = await request(app.getHttpServer()).get(`/users/non-existing-id`).expect(404);
			expect(response.body).toEqual({
				message: "Usuário não encontrado!",
				error: "Not Found",
				statusCode: 404,
			});
		});
	});
});
