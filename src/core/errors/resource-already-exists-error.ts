import { HttpStatus } from "@nestjs/common";
import { DomainError } from "./domain-error";
import { DomainCode } from "./enums/domain-code";

export class ResourceAlreadyExistsError extends DomainError {
	constructor(resource: string, code?: string) {
		super({
			message: `${resource} já existe!`,
			code: code ?? DomainCode.RESOURCE_ALREADY_EXISTS_ERROR,
			status: HttpStatus.CONFLICT,
			causes: [`${resource} já cadastrado no sistema.`],
		});
	}
}
