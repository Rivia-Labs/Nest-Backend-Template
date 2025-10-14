import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { UserEntity } from "../entities/user-entity";

export class UserCreatedEvent implements DomainEvent<UUIDUniqueEntityId> {
	public occurredAt: Date;
	public user: UserEntity;

	constructor(user: UserEntity) {
		this.user = user;
		this.occurredAt = new Date();
	}

	public getAggregateId(): UUIDUniqueEntityId {
		return this.user.id;
	}
}
