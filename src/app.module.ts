import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./infra/configs/env";
import { EnvModule } from "./infra/configs/env/env.module";
import { DatabaseModule } from "./infra/database/database.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: (env: Record<string, unknown>) => envSchema.parse(env),
		}),
		EnvModule,
		DatabaseModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
