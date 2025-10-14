import { NumericUniqueEntityId } from "@/core/entities/id/numeric-unique-entity-id";
import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { RegisterEntity } from "@/domain/audit/enterprise/entities/register-entity";
import { Action, ActionType } from "@/domain/audit/enterprise/entities/value-object/action-vo";

describe("Register Entity", () => {
	const userId = new UUIDUniqueEntityId("user-123");
	const action = Action.create(ActionType.CREATE);

	const validProps = {
		userId,
		action,
	};

	it("should be able to create a register without id", () => {
		const register = RegisterEntity.create(validProps);

		expect(register).toBeInstanceOf(RegisterEntity);
		expect(register.props.userId).toBe(userId);
		expect(register.props.action).toBe(action);
		expect(register.props.createdAt).toBeInstanceOf(Date);
		expect(register.props.updatedAt).toBeInstanceOf(Date);
	});

	it("should be able to create a register with id", () => {
		const id = new NumericUniqueEntityId(1);
		const register = RegisterEntity.create(validProps, id);

		expect(register).toBeInstanceOf(RegisterEntity);
		expect(register.id).toBe(id);
		expect(register.props.userId).toBe(userId);
		expect(register.props.action).toBe(action);
		expect(register.props.createdAt).toBeInstanceOf(Date);
		expect(register.props.updatedAt).toBeInstanceOf(Date);
	});

	it("should preserve createdAt and updatedAt when provided", () => {
		const fixedCreatedAt = new Date("2024-01-01T00:00:00Z");
		const fixedUpdatedAt = new Date("2024-02-01T00:00:00Z");

		const register = RegisterEntity.create({
			...validProps,
			createdAt: fixedCreatedAt,
			updatedAt: fixedUpdatedAt,
		});

		expect(register.props.createdAt).toBe(fixedCreatedAt);
		expect(register.props.updatedAt).toBe(fixedUpdatedAt);
	});

	it("should return false when comparing different entities", () => {
		const register1 = RegisterEntity.create(validProps);
		const register2 = RegisterEntity.create(validProps);

		expect(register1.equals(register2)).toBe(false);
	});

	it("should return true when comparing the same entity instance", () => {
		const register = RegisterEntity.create(validProps);
		expect(register.equals(register)).toBe(true);
	});
});
