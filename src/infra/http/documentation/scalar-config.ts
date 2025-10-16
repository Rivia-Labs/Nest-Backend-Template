import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";

export function createOpenAPIDocument(app: INestApplication) {
	const config = new DocumentBuilder()
		.setTitle("Template API")
		.setDescription("Documentação da API do Template")
		.setVersion("1.0.0")
		// .addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	app.use(
		"/docs",
		apiReference({
			theme: "purple",
			content: document,
		})
	);
}
