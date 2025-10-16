import { Body, Controller, HttpStatus, Logger, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserUseCase } from "@/domain/accounts/application/use-cases/create-user.use-case";
import { ErrorResponseScalar } from "../../documentation/error-response-scalar";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { CreateUserBodyDto, createUserBodySchema } from "./dtos/create-user.dto";

@ApiTags("Users")
@Controller("users")
export class CreateUserController {
	private readonly logger = new Logger(CreateUserController.name);

	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@Post()
	@ApiOperation({ summary: "Cria um novo usuário" })
	@ApiResponse({ status: HttpStatus.CREATED, description: "Usuário criado com sucesso" })
	@ErrorResponseScalar({
		status: HttpStatus.BAD_REQUEST,
		description: "Dados inválidos",
		message: "Validation failed",
		error: "ZodValidationError",
	})
	@ErrorResponseScalar({
		status: HttpStatus.CONFLICT,
		description: "Dados em conflito",
		message: "Usuário com esse email já existe",
		error: "RESOURCE_ALREADY_EXISTS_ERROR",
	})
	public async execute(@Body(new ZodValidationPipe(createUserBodySchema)) body: CreateUserBodyDto) {
		this.logger.log("Received request to create a new user");
		return await this.createUserUseCase.execute(body);
	}
}
