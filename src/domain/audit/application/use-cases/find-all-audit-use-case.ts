import { Injectable, Logger } from "@nestjs/common";
import { Either, success } from "@/core/either";
import { RegisterEntity } from "../../enterprise/entities/register-entity";
import { AuditRepository } from "../repositories/audit-repository";

type FetchAllAuditResponse = Either<null, RegisterEntity[]>;

@Injectable()
export class FetchAllAuditUseCase {
	private readonly logger = new Logger(FetchAllAuditUseCase.name);

	constructor(private readonly auditRepository: AuditRepository) {}

	public async execute(): Promise<FetchAllAuditResponse> {
		this.logger.log("Fetching all audit records");

		const result = await this.auditRepository.findAll();
		this.logger.log(`Fetched ${result.length} audit records`);

		return success(result);
	}
}
