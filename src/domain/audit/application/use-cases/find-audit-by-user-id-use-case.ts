import { Injectable, Logger } from "@nestjs/common";
import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { RegisterEntity } from "../../enterprise/entities/register-entity";
import { AuditRepository } from "../repositories/audit-repository";

type FindAuditByUserIdRequest = {
	userId: string;
};

@Injectable()
export class FindAuditByUserIdUseCase {
	private readonly logger = new Logger(FindAuditByUserIdUseCase.name);

	constructor(private readonly auditRepository: AuditRepository) {}

	public async execute({ userId }: FindAuditByUserIdRequest): Promise<RegisterEntity[]> {
		this.logger.log(`Fetching audit records for user ${userId}`);

		const ID = new UUIDUniqueEntityId(userId);

		const result = await this.auditRepository.findByUserId(ID);
		if (!result) {
			throw new ResourceNotFoundError("Registros de auditoria");
		}
		this.logger.log(`Fetched ${result.length} audit records for user ${userId}`);

		return result;
	}
}
