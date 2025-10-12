import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { UserEntity } from "../entities/user-entity";

export class UserCreatedEvent implements DomainEvent {
	public occurredAt: Date;
	public user: UserEntity;

	constructor(user: UserEntity) {
		this.user = user;
		this.occurredAt = new Date();
	}

	public getAggregateId(): UniqueEntityID {
		return this.user.id;
	}
}
