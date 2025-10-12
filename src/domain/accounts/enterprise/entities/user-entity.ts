import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { UserCreatedEvent } from "../events/user-created.event";
import { Email } from "./value-object/email.vo";
import { UserStatus } from "./value-object/user-status.vo";

export type UserProps = {
	name: string;
	email: Email;
	age?: number;
	status: UserStatus;
	createdAt?: Date;
	updatedAt?: Date;
};

type UserPersistence = {
	id: string;
	name: string;
	email: string;
	age?: number;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
};

export class UserEntity extends AggregateRoot<UserProps> {
	static create(props: UserProps, id?: UniqueEntityID) {
		const user = new UserEntity(
			{
				...props,
			},
			id
		);

		const isNew = !id;

		if (isNew) {
			user.addDomainEvent(new UserCreatedEvent(user));
		}

		return user;
	}

	public toPersistence() {
		return {
			id: this.id.toValue(),
			name: this.props.name,
			email: this.props.email.value,
			age: this.props.age,
			isActive: this.props.status.toBoolean(),
			createdAt: this.props.createdAt,
			updatedAt: this.props.updatedAt,
		};
	}

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
			new UniqueEntityID(data.id)
		);
	}
}
