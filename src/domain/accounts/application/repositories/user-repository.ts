import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { UserEntity } from "../../enterprise/entities/user-entity";
import { Email } from "../../enterprise/entities/value-object/email.vo";

export abstract class UserRepository {
	abstract create(user: UserEntity): Promise<void>;
	abstract findById(id: UniqueEntityID): Promise<UserEntity | null>;
	abstract findByEmail(email: Email): Promise<UserEntity | null>;
	abstract findAll(): Promise<UserEntity[]>;
	abstract update(user: UserEntity): Promise<void>;
	abstract delete(id: UniqueEntityID): Promise<void>;
}
