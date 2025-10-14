import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { CreateUserUseCase } from "@/domain/accounts/application/use-cases/create-user.use-case";
import { FindAllUsersUseCase } from "@/domain/accounts/application/use-cases/find-all-users.use-case";
import { DatabaseModule } from "../database/database.module";
import { CreateUserController } from "./controllers/create-user.controller";
import { FindAllUsersController } from "./controllers/find-all-users.controller";
import { EitherInterceptor } from "./interceptors/either-interceptor";

@Module({
	imports: [DatabaseModule],
	controllers: [CreateUserController, FindAllUsersController],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: EitherInterceptor,
		},
		CreateUserUseCase,
		FindAllUsersUseCase,
	],
})
export class HttpModule {}
