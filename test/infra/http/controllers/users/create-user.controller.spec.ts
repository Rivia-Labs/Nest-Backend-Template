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

	describe("POST /users", () => {
		it("should create a new user with age", async () => {
			const createUserDto = {
				email: "test@example.com",
				name: "Test User",
				age: 25,
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(201);
		});

		it("should create a new user without age", async () => {
			const createUserDto = {
				email: "test@example.com",
				name: "Test User",
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(201);
		});

		it("should return 400 for invalid email format", async () => {
			const createUserDto = {
				email: "invalid-email",
				name: "Test User",
				age: 25,
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(400);
		});

		it("should return 400 for missing email", async () => {
			const createUserDto = {
				name: "Test User",
				age: 25,
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(400);
		});

		it("should return 400 for missing name", async () => {
			const createUserDto = {
				email: "test@example.com",
				age: 25,
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(400);
		});

		it("should return 400 for negative age", async () => {
			const createUserDto = {
				email: "test@example.com",
				name: "Test User",
				age: -1,
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(400);
		});

		it("should return 400 for age over 150", async () => {
			const createUserDto = {
				email: "test@example.com",
				name: "Test User",
				age: 151,
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(400);
		});

		it("should return 409 for duplicate email", async () => {
			const createUserDto = {
				email: "duplicate@example.com",
				name: "First User",
				age: 25,
			};

			await request(app.getHttpServer()).post("/users").send(createUserDto).expect(201);

			const duplicateUserDto = {
				email: "duplicate@example.com",
				name: "Second User",
				age: 30,
			};

			await request(app.getHttpServer()).post("/users").send(duplicateUserDto).expect(409);
		});
	});
});
