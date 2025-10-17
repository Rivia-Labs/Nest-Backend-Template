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
		expect(async () => await sut.execute({ id: "non-existent-id" })).rejects.toThrow(
			ResourceNotFoundError
		);
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

		expect(result).toBeInstanceOf(UserEntity);
		expect(result.id.equals(user.id)).toBe(true);
	});
});
