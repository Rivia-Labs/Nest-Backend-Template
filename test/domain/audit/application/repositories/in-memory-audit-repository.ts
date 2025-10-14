import { NumericUniqueEntityId } from "@/core/entities/id/numeric-unique-entity-id";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AuditRepository } from "@/domain/audit/application/repositories/audit-repository";
import { RegisterEntity } from "@/domain/audit/enterprise/entities/register-entity";
import { Action } from "@/domain/audit/enterprise/entities/value-object/action-vo";

export class InMemoryAuditRepository implements AuditRepository {
	public registers: RegisterEntity[] = [];
	private currentId = 0;

	public async create(register: RegisterEntity): Promise<void> {
		if (!register.id) {
			this.currentId++;
			const newId = new NumericUniqueEntityId(this.currentId);
			const newRegister = RegisterEntity.create(register.props, newId);
			this.registers.push(newRegister);
		} else {
			this.registers.push(register);
		}
	}

	public async findAll(): Promise<RegisterEntity[]> {
		return this.registers;
	}

	public async findByAction(action: Action): Promise<RegisterEntity[] | null> {
		const registers = this.registers.filter(item => item.props.action.equals(action));
		return registers.length > 0 ? registers : null;
	}

	public async findByUserId(userId: UniqueEntityID<string>): Promise<RegisterEntity[] | null> {
		const registers = this.registers.filter(item => item.props.userId.equals(userId));
		return registers.length > 0 ? registers : null;
	}
}
