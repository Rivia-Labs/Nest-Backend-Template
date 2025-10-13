import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { UserEntity } from "./domain/accounts/enterprise/entities/user-entity";
import { Email } from "./domain/accounts/enterprise/entities/value-object/email-vo";
import { UserStatus } from "./domain/accounts/enterprise/entities/value-object/user-status-vo";
import { EnvService } from "./infra/configs/env/env.service";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const envService = app.get(EnvService);
	const port = envService.get("PORT");

	await app.listen(port);
}
bootstrap();
