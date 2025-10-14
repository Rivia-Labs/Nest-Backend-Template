import { DomainError } from "@/core/errors/domain-error";
import { AuditErrorCode } from "./enum/error-code";

export class InvalidActionError extends DomainError {
	constructor(action: string, code?: string) {
		super(`Invalid action: ${action}`, code ?? AuditErrorCode.INVALID_ACTION_ERROR);
	}
}
