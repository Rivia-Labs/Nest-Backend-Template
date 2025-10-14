import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { FindUserByIdUseCase } from "@/domain/accounts/application/use-cases/find-user-by-id.use-case";
import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";
import {
	UserStatus,
	UserStatusEnum,
} from "@/domain/accounts/enterprise/entities/value-object/user-status-vo";
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository";

describe("FindUserByIdUseCase", () => {
	let repository: InMemoryUserRepository;
	let sut: FindUserByIdUseCase;

	beforeEach(() => {
		repository = new InMemoryUserRepository();
		sut = new FindUserByIdUseCase(repository);
	});

	it("should return ResourceNotFoundError when user does not exist", async () => {
		const result = await sut.execute({ id: "non-existent-id" });

		expect(result.failure()).toBe(true);
		expect(result.success()).toBe(false);
		expect(result.value).toBeInstanceOf(ResourceNotFoundError);
	});

	it("should find a user by ID successfully", async () => {
		const user = UserEntity.create({
			email: Email.create("alice@example.com"),
			name: "Alice",
			age: 28,
			status: UserStatus.create(UserStatusEnum.ACTIVE),
		});

		await repository.create(user);

		const result = await sut.execute({ id: user.id.toValue() });

		expect(result.success()).toBe(true);
		expect(result.value).toBeInstanceOf(UserEntity);
		if (result.success()) {
			expect(result.value.id.equals(user.id)).toBe(true);
		}
	});

	it("should log messages during execution", async () => {
		const loggerLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
		const loggerWarnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

		const customRepo = new InMemoryUserRepository();
		const customUseCase = new FindUserByIdUseCase(customRepo);

		// Teste do log de aviso (usuário não encontrado)
		await customUseCase.execute({ id: "invalid-id" });

		// Teste do log de sucesso (usuário encontrado)
		const user = UserEntity.create({
			email: Email.create("bob@example.com"),
			name: "Bob",
			age: 22,
			status: UserStatus.create(UserStatusEnum.ACTIVE),
		});
		await customRepo.create(user);
		await customUseCase.execute({ id: user.id.toString() });

		loggerLogSpy.mockRestore();
		loggerWarnSpy.mockRestore();
	});
});
