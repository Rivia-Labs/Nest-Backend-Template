import { Module } from "@nestjs/common";
import { UserRepository } from "@/domain/accounts/application/repositories/user-repository";
import { AuditRepository } from "@/domain/audit/application/repositories/audit-repository";
import { PrismaService } from "./prisma/prisma.service";
import { AuditRepositoryAdapter } from "./repositories/audit-repository-adapter";
import { UserRepositoryAdapter } from "./repositories/user-repository-adapter";

@Module({
	providers: [
		PrismaService,
		{
			provide: UserRepository,
			useClass: UserRepositoryAdapter,
		},
		{
			provide: AuditRepository,
			useClass: AuditRepositoryAdapter,
		},
	],
	exports: [PrismaService, UserRepository, AuditRepository],
})
export class DatabaseModule {}
