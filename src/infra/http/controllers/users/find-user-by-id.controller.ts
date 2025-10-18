import { Controller, Get, HttpStatus, Logger, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DomainCode } from "@/core/errors/enums/domain-code";
import { FindUserByIdUseCase } from "@/domain/accounts/application/use-cases/find-user-by-id.use-case";
import { ErrorResponseScalar } from "../../documentation/error-response-scalar";
import { UserPresenter } from "./presenters/user-presenter";
import { UserResponseScalar } from "./presenters/user-reponse-scalar";

@ApiTags("Users")
@Controller("users")
export class FindUserByIdController {
	private readonly logger = new Logger(FindUserByIdController.name);

	constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}

	@Get("/:id")
	@ApiOperation({ summary: "Encontra um usuário pelo ID" })
	@ApiResponse({ status: HttpStatus.OK, type: UserResponseScalar })
	@ErrorResponseScalar({
		status: HttpStatus.NOT_FOUND,
		description: "Usuário não encontrado",
		example: {
			code: DomainCode.RESOURCE_NOT_FOUND_ERROR,
			message: "Usuário não encontrado!",
			causes: ["Nenhum usuário encontrado com o ID '123e4567-e89b-12d3-a456-426614174000'"],
			timestamp: new Date(),
		},
	})
	public async execute(@Param("id") id: string) {
		this.logger.log(`Received request to find user by ID: ${id}`);
		const result = await this.findUserByIdUseCase.execute({
			id,
		});
		return UserPresenter.toHttp(result);
	}
}
