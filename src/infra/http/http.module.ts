import { Module } from "@nestjs/common";
import { CreateUserUseCase } from "@/domain/accounts/application/use-cases/create-user.use-case";
import { FindAllUsersUseCase } from "@/domain/accounts/application/use-cases/find-all-users.use-case";
import { FindUserByIdUseCase } from "@/domain/accounts/application/use-cases/find-user-by-id.use-case";
import { FindAllAuditUseCase } from "@/domain/audit/application/use-cases/find-all-audit-use-case";
import { FindAuditByUserIdUseCase } from "@/domain/audit/application/use-cases/find-audit-by-user-id-use-case";
import { DatabaseModule } from "../database/database.module";
import { FindAllAuditController } from "./controllers/audit/find-all-audit.controller";
import { FindAuditsByUserIdController } from "./controllers/audit/find-audits-by-user-id.controller";
import { CreateUserController } from "./controllers/users/create-user.controller";
import { FindAllUsersController } from "./controllers/users/find-all-users.controller";
import { FindUserByIdController } from "./controllers/users/find-user-by-id.controller";

@Module({
	imports: [DatabaseModule],
	controllers: [
		CreateUserController,
		FindAllUsersController,
		FindUserByIdController,
		FindAllAuditController,
		FindAuditsByUserIdController,
	],
	providers: [
		CreateUserUseCase,
		FindAllUsersUseCase,
		FindUserByIdUseCase,
		FindAllAuditUseCase,
		FindAuditByUserIdUseCase,
	],
})
export class HttpModule {}
