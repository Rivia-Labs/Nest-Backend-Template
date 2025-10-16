import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EnvService } from "./infra/configs/env/env.service";
import { createOpenAPIDocument } from "./infra/http/documentation/scalar-config";
import { EitherInterceptor } from "./infra/http/interceptors/either-interceptor";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalInterceptors(new EitherInterceptor());
	createOpenAPIDocument(app);
	const envService = app.get(EnvService);
	const port = envService.get("PORT");

	await app.listen(port);
}
bootstrap();
