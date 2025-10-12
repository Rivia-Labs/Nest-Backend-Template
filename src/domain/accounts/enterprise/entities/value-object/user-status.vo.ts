import { ValueObject } from "@/core/entities/value-object";

export enum UserStatusEnum {
	ACTIVE = "active",
	INACTIVE = "inactive",
	SUSPENDED = "suspended",
	DELETED = "deleted",
}

export class UserStatus extends ValueObject<UserStatusEnum> {
	static create(status: UserStatusEnum): UserStatus {
		return new UserStatus(status);
	}

	static createFromBoolean(isActive: boolean): UserStatus {
		return new UserStatus(isActive ? UserStatusEnum.ACTIVE : UserStatusEnum.INACTIVE);
	}

	get value(): UserStatusEnum {
		return this.props;
	}

	isActive(): boolean {
		return this.props === UserStatusEnum.ACTIVE;
	}

	isInactive(): boolean {
		return this.props === UserStatusEnum.INACTIVE;
	}

	isSuspended(): boolean {
		return this.props === UserStatusEnum.SUSPENDED;
	}

	isDeleted(): boolean {
		return this.props === UserStatusEnum.DELETED;
	}

	canLogin(): boolean {
		return this.props === UserStatusEnum.ACTIVE;
	}

	toBoolean(): boolean {
		return this.props === UserStatusEnum.ACTIVE;
	}
}
