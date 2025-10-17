import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EnvService } from "./infra/configs/env/env.service";
import { configureError } from "./infra/configs/error/error.config";
import { createOpenAPIDocument } from "./infra/http/documentation/scalar-config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	createOpenAPIDocument(app);
	configureError(app);
	const envService = app.get(EnvService);
	const port = envService.get("PORT");

	await app.listen(port);
}
bootstrap();
