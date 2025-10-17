import { FindAllUsersUseCase } from "@/domain/accounts/application/use-cases/find-all-users.use-case";
import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";
import {
	UserStatus,
	UserStatusEnum,
} from "@/domain/accounts/enterprise/entities/value-object/user-status-vo";
import { InMemoryUserRepository } from "../repositories/in-memory-user-repository";

describe("FindAllUsersUseCase", () => {
	let repository: InMemoryUserRepository;
	let sut: FindAllUsersUseCase;

	beforeEach(() => {
		repository = new InMemoryUserRepository();
		sut = new FindAllUsersUseCase(repository);
	});

	it("should return an empty array when no users exist", async () => {
		const result = await sut.execute();
		expect(result).toEqual([]);
	});

	it("should find a list of users successfully", async () => {
		const user = UserEntity.create({
			email: Email.create("alice@example.com"),
			name: "Alice",
			age: 28,
			status: UserStatus.create(UserStatusEnum.ACTIVE),
		});

		await repository.create(user);

		const result = await sut.execute();

		expect(result).toHaveLength(1);
		expect(result).toContainEqual(expect.objectContaining({ id: user.id }));
	});
});
