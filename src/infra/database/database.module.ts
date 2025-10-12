import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { UserRepositoryAdapter } from "./repositories/user.repository.adapter";

@Module({
	providers: [UserRepositoryAdapter],
	exports: [PrismaService],
})
export class DatabaseModule {}
