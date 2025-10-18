import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";
import { UserStatus } from "@/domain/accounts/enterprise/entities/value-object/user-status-vo";
import { User as PrismaUser } from "../prisma/generated/prisma/client";

export class UserMapper {
	static toDomain(data: PrismaUser): UserEntity {
		return UserEntity.create(
			{
				name: data.name,
				email: Email.create(data.email),
				age: data.age,
				status: UserStatus.createFromBoolean(data.isActive),
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
			},
			data.id
		);
	}

	static toPersistence(user: UserEntity): PrismaUser {
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
