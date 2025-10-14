import { DomainError } from "@/core/errors/domain-error";
import { AccountsErrorCode } from "./enums/error-code";

export class InvalidEmailError extends DomainError {
	constructor(email: string, code?: string) {
		super(`Invalid ${email} format`, code ?? AccountsErrorCode.INVALID_EMAIL_ERROR);
	}
}
