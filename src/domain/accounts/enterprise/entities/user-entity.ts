import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { UserCreatedEvent } from "../events/user-created.event";
import { Email } from "./value-object/email-vo";
import { UserStatus } from "./value-object/user-status-vo";

export type UserProps = {
	name: string;
	email: Email;
	age?: number;
	status: UserStatus;
	createdAt?: Date;
	updatedAt?: Date;
};

export class UserEntity extends AggregateRoot<UserProps, UUIDUniqueEntityId> {
	static create(props: UserProps, id?: string) {
		const user = new UserEntity(
			{
				...props,
			},
			new UUIDUniqueEntityId(id)
		);

		const isNew = !id;

		if (isNew) {
			user.addDomainEvent(new UserCreatedEvent(user));
		}

		return user;
	}
}
