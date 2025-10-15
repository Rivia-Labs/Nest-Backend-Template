import { Controller, Get, Logger, Param } from "@nestjs/common";
import { FindUserByIdUseCase } from "@/domain/accounts/application/use-cases/find-user-by-id.use-case";
import { UserPresenter } from "../presenters/user-presenter";

@Controller("users")
export class FindUserByIdController {
	private readonly logger = new Logger(FindUserByIdController.name);

	constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}

	@Get("/:id")
	public async execute(@Param("id") id: string) {
		this.logger.log(`Received request to find user by ID: ${id}`);
		const result = await this.findUserByIdUseCase.execute({
			id,
		});
		if (result.success()) {
			return UserPresenter.toHttp(result.value);
		}
		return result;
	}
}
