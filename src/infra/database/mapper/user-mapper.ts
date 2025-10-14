import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";
import { UserStatus } from "@/domain/accounts/enterprise/entities/value-object/user-status-vo";

type UserPersistence = {
	id: string;
	name: string;
	email: string;
	age?: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export class UserMapper {
	static toDomain(data: UserPersistence): UserEntity {
		return UserEntity.create(
			{
				name: data.name,
				email: Email.create(data.email),
				age: data.age,
				status: UserStatus.createFromBoolean(data.isActive),
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
			},
			new UUIDUniqueEntityId(data.id)
		);
	}

	static toPersistence(user: UserEntity) {
		return {
			id: user.id.toValue(),
			name: user.props.name,
			email: user.props.email.value,
			age: user.props.age,
			isActive: user.props.status.toBoolean(),
			createdAt: user.props.createdAt,
			updatedAt: user.props.updatedAt,
		};
	}
}
