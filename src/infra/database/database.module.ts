import { Module } from "@nestjs/common";
import { UserRepository } from "@/domain/accounts/application/repositories/user-repository";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepositoryAdapter } from "./repositories/user-repository-adapter";

@Module({
	providers: [
		PrismaService,
		{
			provide: UserRepository,
			useClass: UserRepositoryAdapter,
		},
	],
	exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
