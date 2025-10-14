import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { DomainEvents } from "@/core/events/domain-events";
import { UserRepository } from "@/domain/accounts/application/repositories/user-repository";
import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";

export class InMemoryUserRepository implements UserRepository {
	public users: UserEntity[] = [];

	public async findById(id: UUIDUniqueEntityId): Promise<UserEntity | null> {
		const user = this.users.find(item => item.id.equals(id));
		return user ?? null;
	}

	public async findByEmail(email: Email): Promise<UserEntity | null> {
		const user = this.users.find(item => item.props.email.equals(email));
		return user ?? null;
	}

	public async create(user: UserEntity): Promise<void> {
		this.users.push(user);

		DomainEvents.dispatchEventsForAggregate(user.id);
	}

	public async update(user: UserEntity): Promise<void> {
		const userIndex = this.users.findIndex(item => item.equals(user));
		this.users[userIndex] = user;
	}

	public async delete(id: UUIDUniqueEntityId): Promise<void> {
		const userIndex = this.users.findIndex(item => item.id === id);
		this.users.splice(userIndex, 1);
	}

	findAll(): Promise<UserEntity[]> {
		return Promise.resolve(this.users);
	}
}
