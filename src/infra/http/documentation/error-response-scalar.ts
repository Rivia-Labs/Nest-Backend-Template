import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiExtraModels, ApiResponse } from "@nestjs/swagger";
import { ErrorResponse } from "@/infra/configs/error/responses/error.response";

type ErrorResponseScalarOptions = {
	status: HttpStatus;
	description: string;
	example: ErrorResponse;
};

export function ErrorResponseScalar({ status, description, example }: ErrorResponseScalarOptions) {
	return applyDecorators(
		ApiExtraModels(ErrorResponse),
		ApiResponse({
			status,
			description,
			example,
		})
	);
}
