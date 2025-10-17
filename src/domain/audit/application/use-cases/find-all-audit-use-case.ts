import { Injectable, Logger } from "@nestjs/common";
import { RegisterEntity } from "../../enterprise/entities/register-entity";
import { AuditRepository } from "../repositories/audit-repository";

@Injectable()
export class FindAllAuditUseCase {
	private readonly logger = new Logger(FindAllAuditUseCase.name);

	constructor(private readonly auditRepository: AuditRepository) {}

	public async execute(): Promise<RegisterEntity[]> {
		this.logger.log("Finding all audit records");

		const result = await this.auditRepository.findAll();
		this.logger.log(`Finded ${result.length} audit records`);

		return result;
	}
}
