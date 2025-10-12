import { Injectable, Logger } from "@nestjs/common";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { UserRepository } from "@/domain/accounts/application/repositories/user-repository";
import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email.vo";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
	private readonly logger = new Logger(UserRepositoryAdapter.name);

	constructor(private readonly prisma: PrismaService) {}

	public async create(user: UserEntity): Promise<void> {
		this.logger.log(`Creating user with ID: ${user.id.toValue()}`);
		const persistenceData = user.toPersistence();
		await this.prisma.user.create({
			data: {
				id: persistenceData.id,
				name: persistenceData.name,
				email: persistenceData.email,
				age: persistenceData.age,
				isActive: persistenceData.isActive,
				createdAt: persistenceData.createdAt,
				updatedAt: persistenceData.updatedAt,
			},
		});
	}

	public async update(user: UserEntity): Promise<void> {
		this.logger.log(`Updating user with ID: ${user.id.toValue()}`);
		const persistenceData = user.toPersistence();
		await this.prisma.user.update({
			where: { id: persistenceData.id },
			data: {
				name: persistenceData.name,
				email: persistenceData.email,
				age: persistenceData.age,
				isActive: persistenceData.isActive,
				createdAt: persistenceData.createdAt,
				updatedAt: persistenceData.updatedAt,
			},
		});
	}

	public async delete(id: UniqueEntityID): Promise<void> {
		this.logger.log(`Deleting user with ID: ${id.toValue()}`);
		await this.prisma.user.delete({
			where: { id: id.toValue() },
		});
	}

	public async findById(id: UniqueEntityID): Promise<UserEntity | null> {
		this.logger.log(`Finding user with ID: ${id.toValue()}`);
		const userRecord = await this.prisma.user.findUnique({
			where: { id: id.toValue() },
		});

		if (!userRecord) {
			this.logger.warn(`User with ID: ${id.toValue()} not found`);
			return null;
		}

		return UserEntity.toDomain(userRecord);
	}

	public async findByEmail(email: Email): Promise<UserEntity | null> {
		this.logger.log(`Finding user with email: ${email.value}`);
		const userRecord = await this.prisma.user.findUnique({
			where: { email: email.value },
		});

		if (!userRecord) {
			this.logger.warn(`User with email: ${email} not found`);
			return null;
		}

		return UserEntity.toDomain(userRecord);
	}

	public async findAll(): Promise<UserEntity[]> {
		this.logger.log(`Finding all users`);
		const userRecords = await this.prisma.user.findMany();
		return userRecords.map(UserEntity.toDomain);
	}
}
