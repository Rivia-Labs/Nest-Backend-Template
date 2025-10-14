import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { RegisterEntity } from "../../enterprise/entities/register-entity";
import { Action } from "../../enterprise/entities/value-object/action-vo";

export abstract class AuditRepository {
	abstract create(register: RegisterEntity): Promise<void>;
	abstract findAll(): Promise<RegisterEntity[]>;
	abstract findByUserId(userId: UniqueEntityID<string>): Promise<RegisterEntity[] | null>;
	abstract findByAction(action: Action): Promise<RegisterEntity[] | null>;
}
