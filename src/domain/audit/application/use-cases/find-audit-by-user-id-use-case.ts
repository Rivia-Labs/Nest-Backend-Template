import { Injectable, Logger } from "@nestjs/common";
import { Either, failure, success } from "@/core/either";
import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { RegisterEntity } from "../../enterprise/entities/register-entity";
import { AuditRepository } from "../repositories/audit-repository";

type FindAuditByUserIdRequest = {
	userId: string;
};

type FindAuditByUserIdResponse = Either<ResourceNotFoundError, RegisterEntity[]>;

@Injectable()
export class FindAuditByUserIdUseCase {
	private readonly logger = new Logger(FindAuditByUserIdUseCase.name);

	constructor(private readonly auditRepository: AuditRepository) {}

	public async execute({ userId }: FindAuditByUserIdRequest): Promise<FindAuditByUserIdResponse> {
		this.logger.log(`Fetching audit records for user ${userId}`);

		const ID = new UUIDUniqueEntityId(userId);

		const result = await this.auditRepository.findByUserId(ID);
		if (!result) {
			return failure(new ResourceNotFoundError("Registros de auditoria"));
		}
		this.logger.log(`Fetched ${result.length} audit records for user ${userId}`);

		return success(result);
	}
}
