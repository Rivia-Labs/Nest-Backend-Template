import { Controller, Get, HttpStatus, Logger, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindUserByIdUseCase } from "@/domain/accounts/application/use-cases/find-user-by-id.use-case";
import { ErrorResponseScalar } from "../../documentation/error-response-scalar";
import { UserPresenter } from "../../presenters/user-presenter";
import { UserResponseScalar } from "./dtos/user-reponse-scalar";

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
		message: "Usuário não encontrado!",
		error: "RESOURCE_NOT_FOUND_ERROR",
	})
	public async execute(@Param("id") id: string) {
		this.logger.log(`Received request to find user by ID: ${id}`);
		const result = await this.findUserByIdUseCase.execute({
			id,
		});
		return UserPresenter.toHttp(result);
	}
}
