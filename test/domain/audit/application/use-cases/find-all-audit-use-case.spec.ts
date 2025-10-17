import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { FindAllAuditUseCase } from "@/domain/audit/application/use-cases/find-all-audit-use-case";
import { RegisterEntity } from "@/domain/audit/enterprise/entities/register-entity";
import { Action, ActionType } from "@/domain/audit/enterprise/entities/value-object/action-vo";
import { InMemoryAuditRepository } from "../repositories/in-memory-audit-repository";

describe("FindAllAuditUseCase", () => {
	let repository: InMemoryAuditRepository;
	let sut: FindAllAuditUseCase;

	beforeEach(() => {
		repository = new InMemoryAuditRepository();
		sut = new FindAllAuditUseCase(repository);
	});

	it("should return an empty array when no audit records exist", async () => {
		const result = await sut.execute();
		expect(result).toEqual([]);
	});

	it("should find a list of users successfully", async () => {
		const register = RegisterEntity.create({
			action: Action.create(ActionType.CREATE),
			userId: new UUIDUniqueEntityId(),
		});

		await repository.create(register);

		const result = await sut.execute();
		expect(result).toHaveLength(1);
	});
});
