import { Controller, Get, Logger } from "@nestjs/common";
import { FindAllUsersUseCase } from "@/domain/accounts/application/use-cases/find-all-users.use-case";

@Controller("users")
export class FindAllUsersController {
	private readonly logger = new Logger(FindAllUsersController.name);

	constructor(private readonly findAllUsersUseCase: FindAllUsersUseCase) {}

	@Get()
	public async execute() {
		this.logger.log("Received request to find all users");
		return await this.findAllUsersUseCase.execute();
	}
}
