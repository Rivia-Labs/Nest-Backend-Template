import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";
import { UserStatusEnum } from "@/domain/accounts/enterprise/entities/value-object/user-status-vo";
import { OnUserCreated } from "@/domain/audit/application/subscribers/on-user-created";
import { InMemoryUserRepository } from "../../../accounts/application/repositories/in-memory-user-repository";
import { InMemoryAuditRepository } from "../repositories/in-memory-audit-repository";

describe("OnUserCreatedEvent", () => {
	let userRepository: InMemoryUserRepository;
	let auditRepository: InMemoryAuditRepository;

	beforeEach(() => {
		userRepository = new InMemoryUserRepository();
		auditRepository = new InMemoryAuditRepository();
	});

	it("should be able to dispatch an event when user is created", async () => {
		new OnUserCreated(auditRepository);
		const user = UserEntity.create({
			email: Email.create("john@example.com"),
			name: "John",
			age: 30,
			status: { value: UserStatusEnum.ACTIVE } as any,
		});
		await userRepository.create(user);

		expect(auditRepository.registers).toHaveLength(1);
		expect(auditRepository.registers[0].props.userId.toValue()).toBe(user.id.toValue());
		expect(auditRepository.registers[0].props.action.value).toBe("create");
	});
});
