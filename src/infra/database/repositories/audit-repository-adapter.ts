import { Injectable, Logger } from "@nestjs/common";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AuditRepository } from "@/domain/audit/application/repositories/audit-repository";
import { RegisterEntity } from "@/domain/audit/enterprise/entities/register-entity";
import { Action } from "@/domain/audit/enterprise/entities/value-object/action-vo";
import { AuditMapper } from "../mapper/audit-mapper";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuditRepositoryAdapter implements AuditRepository {
	private readonly logger = new Logger(AuditRepositoryAdapter.name);

	constructor(private readonly prisma: PrismaService) {}

	public async create(register: RegisterEntity): Promise<void> {
		this.logger.log(`Creating audit register with ID: ${register.id.toValue()}`);

		const data = AuditMapper.toPersistence(register);
		await this.prisma.audit.create({
			data: {
				id: data.id,
				action: data.action,
				userId: data.userId,
				createdAt: data.createdAt,
				updatedAt: data.updatedAt,
			},
		});
	}

	public async findAll(): Promise<RegisterEntity[]> {
		const audits = await this.prisma.audit.findMany();
		return audits.map(AuditMapper.toDomain);
	}

	public async findByAction(action: Action): Promise<RegisterEntity[] | null> {
		const audits = await this.prisma.audit.findMany({
			where: { action: action.value },
		});
		if (audits.length === 0) {
			return null;
		}

		return audits.map(AuditMapper.toDomain);
	}

	public async findByUserId(userId: UniqueEntityID<string>): Promise<RegisterEntity[] | null> {
		const audits = await this.prisma.audit.findMany({
			where: { userId: userId.toValue() },
		});
		if (audits.length === 0) {
			return null;
		}
		return audits.map(AuditMapper.toDomain);
	}
}
