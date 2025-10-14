import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { UserEntity } from "../../enterprise/entities/user-entity";
import { Email } from "../../enterprise/entities/value-object/email-vo";

export abstract class UserRepository {
	abstract findById(id: UUIDUniqueEntityId): Promise<UserEntity | null>;
	abstract findByEmail(email: Email): Promise<UserEntity | null>;
	abstract findAll(): Promise<UserEntity[]>;
	abstract create(user: UserEntity): Promise<void>;
	abstract update(user: UserEntity): Promise<void>;
	abstract delete(id: UUIDUniqueEntityId): Promise<void>;
}
