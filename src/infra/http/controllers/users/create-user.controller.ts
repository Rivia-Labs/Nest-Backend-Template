import { Body, Controller, HttpStatus, Logger, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DomainCode } from "@/core/errors/enums/domain-code";
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
		example: {
			code: "ERR_INVALID_REQUEST_DATA",
			message: "Dados de requisição inválidos",
			causes: ["O campo 'email' é obrigatório", "O campo 'age' deve ser um número positivo"],
			timestamp: new Date(),
		},
	})
	@ErrorResponseScalar({
		status: HttpStatus.CONFLICT,
		description: "Dados em conflito",
		example: {
			code: DomainCode.RESOURCE_ALREADY_EXISTS_ERROR,
			message: "Usuário com esse email já existe",
			causes: ["Um usuário com o email 'joedoe@example.com' já está cadastrado"],
			timestamp: new Date(),
		},
	})
	public async execute(@Body(new ZodValidationPipe(createUserBodySchema)) body: CreateUserBodyDto) {
		this.logger.log("Received request to create a new user");
		return await this.createUserUseCase.execute(body);
	}
}
