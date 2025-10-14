import { Body, Controller, Logger, Post } from "@nestjs/common";
import z from "zod";
import { CreateUserUseCase } from "@/domain/accounts/application/use-cases/create-user.use-case";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";

const createUserBodySchema = z.object({
	name: z.string().min(2).max(100),
	email: z.email(),
	age: z.number().min(0).max(150).optional(),
});

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema);
type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller("users")
export class CreateUserController {
	private readonly logger = new Logger(CreateUserController.name);

	constructor(private readonly createUserUseCase: CreateUserUseCase) {}

	@Post()
	public async execute(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
		this.logger.log("Received request to create a new user");
		return await this.createUserUseCase.execute(body);
	}
}
