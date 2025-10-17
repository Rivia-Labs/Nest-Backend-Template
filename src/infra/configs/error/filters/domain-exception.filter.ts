import { type ArgumentsHost, Catch, type ExceptionFilter } from "@nestjs/common";

import type { Response } from "express";
import { DomainError } from "@/core/errors/domain-error";
import { ErrorResponse } from "../responses/error.response";

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
	catch(exception: DomainError, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const responseBody = ErrorResponse.ofBusinessException(exception);
		response.status(exception.status).json(responseBody);
	}
}
