import { faker } from "@faker-js/faker";
import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";
import {
	UserStatus,
	UserStatusEnum,
} from "@/domain/accounts/enterprise/entities/value-object/user-status-vo";

interface UserFixtureProps {
	name: string;
	email: string;
	age?: number;
	status: UserStatusEnum;
	createdAt?: Date;
	updatedAt?: Date;
}

export function userFixture(data?: Partial<UserFixtureProps>) {
	const email = Email.create(data?.email ?? faker.internet.email());
	const status = UserStatus.create(data?.status ?? UserStatusEnum.ACTIVE);

	const user = UserEntity.create({
		email,
		name: data?.name ?? faker.person.fullName(),
		age: data?.age ?? faker.number.int({ min: 18, max: 80 }),
		status,
		createdAt: data?.createdAt,
		updatedAt: data?.updatedAt,
	});
	return user;
}
