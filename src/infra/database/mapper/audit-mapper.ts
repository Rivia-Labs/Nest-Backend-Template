import { NumericUniqueEntityId } from "@/core/entities/id/numeric-unique-entity-id";
import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { RegisterEntity } from "@/domain/audit/enterprise/entities/register-entity";
import { Action } from "@/domain/audit/enterprise/entities/value-object/action-vo";
import { Audit as PrismaAudit } from "../prisma/generated/prisma/client";

export class AuditMapper {
	public static toDomain(data: PrismaAudit): RegisterEntity {
		const action = Action.createFromString(data.action);
		return RegisterEntity.create(
			{
				action: action,
				userId: new UUIDUniqueEntityId(data.userId),
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
			},
			new NumericUniqueEntityId(data.id)
		);
	}

	public static toPersistence(register: RegisterEntity): PrismaAudit {
		return {
			id: register.id?.toValue() ?? undefined,
			action: register.props.action.value,
			userId: register.props.userId.toValue(),
			createdAt: register.props.createdAt,
			updatedAt: register.props.updatedAt,
		};
	}
}
