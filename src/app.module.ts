import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./infra/configs/env";
import { EnvModule } from "./infra/configs/env/env.module";
import { HttpModule } from "./infra/http/http.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: env => envSchema.parse(env),
			isGlobal: true,
		}),
		HttpModule,
		EnvModule,
	],
})
export class AppModule {}
