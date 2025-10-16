import { Controller, Get, HttpStatus, Logger, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindAuditByUserIdUseCase } from "@/domain/audit/application/use-cases/find-audit-by-user-id-use-case";
import { ErrorResponseScalar } from "../../documentation/error-response-scalar";
import { AuditPresenter } from "../../presenters/audit-presenter";
import { AuditResponseScalar } from "./dtos/audit-resonse-scalar";

@ApiTags("Audits")
@Controller("audits")
export class FindAuditsByUserIdController {
	private readonly logger = new Logger(FindAuditsByUserIdController.name);

	constructor(private readonly findAuditByUserIdUseCase: FindAuditByUserIdUseCase) {}

	@Get("/:userId")
	@ApiOperation({ summary: "Encontra registros de auditoria pelo ID do usuário" })
	@ApiResponse({ status: HttpStatus.OK, type: [AuditResponseScalar] })
	@ErrorResponseScalar({
		status: HttpStatus.NOT_FOUND,
		description: "Registro não encontrado",
		message: "Registro não encontrado!",
		error: "RESOURCE_NOT_FOUND_ERROR",
	})
	public async execute(@Param("userId") userId: string) {
		this.logger.log(`Received request to find audit by user ID: ${userId}`);
		const result = await this.findAuditByUserIdUseCase.execute({
			userId: userId,
		});
		if (result.success()) {
			return AuditPresenter.toHttpList(result.value);
		}
		return result;
	}
}
