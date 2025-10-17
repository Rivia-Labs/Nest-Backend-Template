import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { FindAuditByUserIdUseCase } from "@/domain/audit/application/use-cases/find-audit-by-user-id-use-case";
import { RegisterEntity } from "@/domain/audit/enterprise/entities/register-entity";
import { Action, ActionType } from "@/domain/audit/enterprise/entities/value-object/action-vo";
import { InMemoryAuditRepository } from "../repositories/in-memory-audit-repository";

describe("FindAuditByUserIdUseCase", () => {
	let repository: InMemoryAuditRepository;
	let sut: FindAuditByUserIdUseCase;

	beforeEach(() => {
		repository = new InMemoryAuditRepository();
		sut = new FindAuditByUserIdUseCase(repository);
	});

	it("should throw a ResourceNotFoundError when no audit records exist", async () => {
		await expect(
			sut.execute({
				userId: new UUIDUniqueEntityId().toValue(),
			})
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should find a list of users successfully", async () => {
		const register = RegisterEntity.create({
			action: Action.create(ActionType.CREATE),
			userId: new UUIDUniqueEntityId(),
		});

		await repository.create(register);

		const result = await sut.execute({
			userId: register.props.userId.toValue(),
		});
		expect(result).toHaveLength(1);
	});
});
