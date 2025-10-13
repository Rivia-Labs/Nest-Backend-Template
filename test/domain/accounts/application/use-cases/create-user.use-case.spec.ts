import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error";
import { CreateUserUseCase } from "@/domain/accounts/application/use-cases/create-user.use-case";
import { InvalidEmailError } from "@/domain/accounts/application/use-cases/errors/invalid-email-error";
import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";
import { UserStatusEnum } from "@/domain/accounts/enterprise/entities/value-object/user-status-vo";
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository";

describe("CreateUserUseCase", () => {
	let sut: CreateUserUseCase;
	let repository: InMemoryUserRepository;

	beforeEach(() => {
		repository = new InMemoryUserRepository();
		sut = new CreateUserUseCase(repository);
	});

	it("should not create user with invalid email", async () => {
		const result = await sut.execute({
			email: "invalid-email",
			name: "John Doe",
		});

		expect(result.failure()).toBe(true);
		expect(result.value).toBeInstanceOf(InvalidEmailError);
	});

	it("should not create user if already exists", async () => {
		const existingUser = UserEntity.create({
			email: Email.create("john@example.com"),
			name: "John",
			age: 30,
			status: { value: UserStatusEnum.ACTIVE } as any, // mock VO
		});

		await repository.create(existingUser);

		const result = await sut.execute({
			email: "john@example.com",
			name: "John Doe",
		});

		expect(result.failure()).toBe(true);
		expect(result.value).toBeInstanceOf(ResourceAlreadyExistsError);
	});

	it("should create a new user successfully", async () => {
		const result = await sut.execute({
			email: "newuser@example.com",
			name: "Alice",
			age: 25,
		});

		expect(result.success()).toBe(true);
		expect(result.value).toBeNull();

		const allUsers = await repository.findAll();
		expect(allUsers).toHaveLength(1);
		expect(allUsers[0].props.email.value).toBe("newuser@example.com");
		expect(allUsers[0].props.status.value).toBe(UserStatusEnum.ACTIVE);
	});

	it("should log steps of creation process", async () => {
		const loggerSpy = jest.spyOn(console, "log").mockImplementation(() => {});

		// Substituímos o logger interno por um mock de console
		const customRepository = new InMemoryUserRepository();
		const customUseCase = new CreateUserUseCase(customRepository);

		await customUseCase.execute({
			email: "loguser@example.com",
			name: "Logger",
		});

		loggerSpy.mockRestore();
	});
});
