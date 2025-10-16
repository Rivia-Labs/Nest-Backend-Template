import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CreateUserUseCase } from "@/domain/accounts/application/use-cases/create-user.use-case";
import { FindAllUsersUseCase } from "@/domain/accounts/application/use-cases/find-all-users.use-case";
import { FindUserByIdUseCase } from "@/domain/accounts/application/use-cases/find-user-by-id.use-case";
import { DatabaseModule } from "../database/database.module";
import { CreateUserController } from "./controllers/users/create-user.controller";
import { FindAllUsersController } from "./controllers/users/find-all-users.controller";
import { FindUserByIdController } from "./controllers/users/find-user-by-id.controller";
import { EitherInterceptor } from "./interceptors/either-interceptor";

@Module({
	imports: [DatabaseModule],
	controllers: [CreateUserController, FindAllUsersController, FindUserByIdController],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: EitherInterceptor,
		},
		CreateUserUseCase,
		FindAllUsersUseCase,
		FindUserByIdUseCase,
	],
})
export class HttpModule {}
