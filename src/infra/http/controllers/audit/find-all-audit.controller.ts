import { Controller, Get, HttpStatus, Logger } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindAllAuditUseCase } from "@/domain/audit/application/use-cases/find-all-audit-use-case";
import { AuditPresenter } from "../../presenters/audit-presenter";
import { AuditResponseScalar } from "./dtos/audit-resonse-scalar";

@ApiTags("Audits")
@Controller("audits")
export class FindAllAuditController {
	private readonly logger = new Logger(FindAllAuditController.name);

	constructor(private readonly findAllAuditUseCase: FindAllAuditUseCase) {}

	@Get()
	@ApiOperation({ summary: "Lista de registros de auditoria retornada com sucesso" })
	@ApiResponse({
		status: HttpStatus.OK,
		description: "Registros de auditoria retornados com sucesso",
		type: [AuditResponseScalar],
	})
	public async execute() {
		this.logger.log("Received request to find all audit records");
		const result = await this.findAllAuditUseCase.execute();
		return AuditPresenter.toHttpList(result);
	}
}
