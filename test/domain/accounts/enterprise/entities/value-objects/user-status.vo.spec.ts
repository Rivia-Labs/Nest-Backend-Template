import {
	UserStatus,
	UserStatusEnum,
} from "@/domain/accounts/enterprise/entities/value-object/user-status.vo";

describe("VO UserStatus", () => {
	it("should create an active user status", () => {
		const result = UserStatus.create(UserStatusEnum.ACTIVE);

		expect(result).toBeInstanceOf(UserStatus);
		expect(result.value).toBe(UserStatusEnum.ACTIVE);
		expect(result.isActive()).toBe(true);
		expect(result.canLogin()).toBe(true);
		expect(result.toBoolean()).toBe(true);
	});

	it("should create an inactive user status", () => {
		const result = UserStatus.create(UserStatusEnum.INACTIVE);

		expect(result.value).toBe(UserStatusEnum.INACTIVE);
		expect(result.isInactive()).toBe(true);
		expect(result.canLogin()).toBe(false);
		expect(result.toBoolean()).toBe(false);
	});

	it("should create a suspended user status", () => {
		const result = UserStatus.create(UserStatusEnum.SUSPENDED);

		expect(result.value).toBe(UserStatusEnum.SUSPENDED);
		expect(result.isSuspended()).toBe(true);
		expect(result.canLogin()).toBe(false);
	});

	it("should create a deleted user status", () => {
		const result = UserStatus.create(UserStatusEnum.DELETED);

		expect(result.value).toBe(UserStatusEnum.DELETED);
		expect(result.isDeleted()).toBe(true);
		expect(result.canLogin()).toBe(false);
	});
});
