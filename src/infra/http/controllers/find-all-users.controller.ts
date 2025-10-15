import { Controller, Get, Logger } from "@nestjs/common";
import { FindAllUsersUseCase } from "@/domain/accounts/application/use-cases/find-all-users.use-case";
import { UserPresenter } from "../presenters/user-presenter";

@Controller("users")
export class FindAllUsersController {
	private readonly logger = new Logger(FindAllUsersController.name);

	constructor(private readonly findAllUsersUseCase: FindAllUsersUseCase) {}

	@Get()
	public async execute() {
		this.logger.log("Received request to find all users");
		const result = await this.findAllUsersUseCase.execute();
		if (result.success()) {
			return UserPresenter.toHttpList(result.value);
		}
	}
}
