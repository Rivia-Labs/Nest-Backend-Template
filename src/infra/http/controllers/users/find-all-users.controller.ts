import { Controller, Get, HttpStatus, Logger } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FindAllUsersUseCase } from "@/domain/accounts/application/use-cases/find-all-users.use-case";
import { UserPresenter } from "../../presenters/user-presenter";
import { UserResponseScalar } from "./dtos/user-reponse-scalar";

@ApiTags("Users")
@Controller("users")
export class FindAllUsersController {
	private readonly logger = new Logger(FindAllUsersController.name);

	constructor(private readonly findAllUsersUseCase: FindAllUsersUseCase) {}

	@Get()
	@ApiOperation({ summary: "Lista de usuários retornada com sucesso" })
	@ApiResponse({ status: HttpStatus.OK, type: [UserResponseScalar] })
	public async execute() {
		this.logger.log("Received request to find all users");
		const result = await this.findAllUsersUseCase.execute();
		return UserPresenter.toHttpList(result);
	}
}
