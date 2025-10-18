import { DomainError } from "@/core/errors/domain-error";
import type { BusinessException } from "../exceptions/business.exception";

export class ErrorResponse {
	code: string;
	message: string;
	causes: string[] = [];
	timestamp: Date = new Date();

	static ofError(error: Error): ErrorResponse {
		const response = new ErrorResponse();
		response.code = "ERR_GENERIC";
		response.message = error.message;
		return response;
	}

	static ofBusinessException(exception: BusinessException) {
		const response = new ErrorResponse();
		response.code = exception.code;
		response.message = exception.message;
		response.causes = exception.causes;
		return response;
	}

	static ofDomainError(exception: DomainError) {
		const response = new ErrorResponse();
		response.code = exception.code;
		response.message = exception.message;
		response.causes = exception.causes;
		return response;
	}
}
