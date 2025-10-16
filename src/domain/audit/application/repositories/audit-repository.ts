import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { RegisterEntity } from "../../enterprise/entities/register-entity";
import { Action } from "../../enterprise/entities/value-object/action-vo";

export abstract class AuditRepository {
	abstract create(register: RegisterEntity): Promise<void>;
	abstract findAll(): Promise<RegisterEntity[]>;
	abstract findByUserId(userId: UUIDUniqueEntityId): Promise<RegisterEntity[] | null>;
	abstract findByAction(action: Action): Promise<RegisterEntity[] | null>;
}
