import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { UserEntity, UserProps } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";
import {
	UserStatus,
	UserStatusEnum,
} from "@/domain/accounts/enterprise/entities/value-object/user-status-vo";
import { UserCreatedEvent } from "@/domain/accounts/enterprise/events/user-created.event";

describe("UserCreatedEvent", () => {
	let user: UserEntity;

	beforeEach(() => {
		const props: UserProps = {
			name: "John Doe",
			email: Email.create("john.doe@example.com"),
			status: UserStatus.create(UserStatusEnum.ACTIVE),
			age: 28,
			createdAt: new Date("2024-01-01T00:00:00Z"),
			updatedAt: new Date("2024-01-01T00:00:00Z"),
		};

		user = UserEntity.create(props, new UUIDUniqueEntityId("user-uuid-123").toValue());
	});

	it("should create a UserCreatedEvent instance with the correct user", () => {
		const event = new UserCreatedEvent(user);

		expect(event).toBeInstanceOf(UserCreatedEvent);
		expect(event.user).toBe(user);
		expect(event.occurredAt).toBeInstanceOf(Date);
	});

	it("should set occurredAt automatically on creation", () => {
		const before = new Date();
		const event = new UserCreatedEvent(user);
		const after = new Date();

		expect(event.occurredAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
		expect(event.occurredAt.getTime()).toBeLessThanOrEqual(after.getTime());
	});

	it("should return the same aggregate id as the user entity", () => {
		const event = new UserCreatedEvent(user);
		expect(event.getAggregateId()).toBe(user.id);
	});
});
