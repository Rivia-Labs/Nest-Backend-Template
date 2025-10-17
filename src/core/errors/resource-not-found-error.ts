import { HttpStatus } from "@nestjs/common";
import { DomainError } from "./domain-error";
import { DomainCode } from "./enums/domain-code";

export class ResourceNotFoundError extends DomainError {
	constructor(resource: string, code?: string) {
		super({
			message: `${resource} não encontrado!`,
			code: code ?? DomainCode.RESOURCE_NOT_FOUND_ERROR,
			status: HttpStatus.NOT_FOUND,
			causes: [`${resource} não cadastrado no sistema.`],
		});
	}
}
