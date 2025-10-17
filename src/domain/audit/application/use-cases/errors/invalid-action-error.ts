import { DomainError } from "@/core/errors/domain-error";
import { AuditErrorCode } from "./enum/error-code";

export class InvalidActionError extends DomainError {
	constructor(action: string, code?: string) {
		super({
			message: `Ação inválida: ${action}`,
			code: code ?? AuditErrorCode.INVALID_ACTION_ERROR,
			status: 400,
			causes: [`A ação ${action} não é permitida.`],
		});
	}
}
