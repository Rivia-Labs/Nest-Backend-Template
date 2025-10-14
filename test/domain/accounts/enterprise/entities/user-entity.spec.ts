import { UserEntity, type UserProps } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";
import {
	UserStatus,
	UserStatusEnum,
} from "@/domain/accounts/enterprise/entities/value-object/user-status-vo";

describe("User Entity", () => {
	const validProps: UserProps = {
		name: "John Doe",
		email: Email.create("john.doe@example.com"),
		status: UserStatus.create(UserStatusEnum.ACTIVE),
		age: 30,
	};

	it("Should be able to create a user entity without id", () => {
		const user = UserEntity.create(validProps);
		expect(user).toBeInstanceOf(UserEntity);
		expect(user.props).toEqual(validProps);
		expect(user.id).toBeDefined();
	});

	it("Should be able to create a user entity with id", () => {
		const id = "123e4567-e89b-12d3-a456-426614174000";
		const user = UserEntity.create(validProps, id);
		expect(user).toBeInstanceOf(UserEntity);
		expect(user.props).toEqual(validProps);
		expect(user.id.toValue()).toBe(id);
	});
});
