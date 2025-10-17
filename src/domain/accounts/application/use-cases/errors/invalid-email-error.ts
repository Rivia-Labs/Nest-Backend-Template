import { HttpStatus } from "@nestjs/common";
import { DomainError } from "@/core/errors/domain-error";
import { AccountsErrorCode } from "./enums/error-code";

export class InvalidEmailError extends DomainError {
	constructor(email: string, code?: string) {
		super({
			message: `Formato de email inválido: ${email}`,
			code: code ?? AccountsErrorCode.INVALID_EMAIL_ERROR,
			status: HttpStatus.BAD_REQUEST,
			causes: [`O email ${email} não segue o formato padrão.`],
		});
	}
}
