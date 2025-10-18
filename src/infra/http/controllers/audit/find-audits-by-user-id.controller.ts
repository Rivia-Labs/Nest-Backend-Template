import { Controller, Get, HttpStatus, Logger, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DomainCode } from "@/core/errors/enums/domain-code";
import { FindAuditByUserIdUseCase } from "@/domain/audit/application/use-cases/find-audit-by-user-id-use-case";
import { ErrorResponseScalar } from "../../documentation/error-response-scalar";
import { AuditPresenter } from "./presenters/audit-presenter";
import { AuditResponseScalar } from "./presenters/audit-response-scalar";

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
		example: {
			code: DomainCode.RESOURCE_NOT_FOUND_ERROR,
			message: "Registro não encontrado!",
			causes: [
				"Nenhum registro de auditoria encontrado para o ID de usuário '123e4567-e89b-12d3-a456-426614174000'",
			],
			timestamp: new Date(),
		},
	})
	public async execute(@Param("userId") userId: string) {
		this.logger.log(`Received request to find audit by user ID: ${userId}`);
		const result = await this.findAuditByUserIdUseCase.execute({
			userId: userId,
		});
		return AuditPresenter.toHttpList(result);
	}
}
