import { Injectable, Logger } from "@nestjs/common";
import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { DomainEvents } from "@/core/events/domain-events";
import { UserRepository } from "@/domain/accounts/application/repositories/user-repository";
import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";
import { UserMapper } from "../mapper/user-mapper";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserRepositoryAdapter implements UserRepository {
	private readonly logger = new Logger(UserRepositoryAdapter.name);

	constructor(private readonly prisma: PrismaService) {}

	public async findById(id: UUIDUniqueEntityId): Promise<UserEntity | null> {
		this.logger.log(`Finding user with ID: ${id.toValue()}`);
		const user = await this.prisma.user.findUnique({
			where: { id: id.toValue() },
		});

		if (!user) {
			this.logger.warn(`User with ID: ${id} not found`);
			return null;
		}

		return UserMapper.toDomain(user);
	}

	public async findByEmail(email: Email): Promise<UserEntity | null> {
		this.logger.log(`Finding user with email: ${email.value}`);
		const user = await this.prisma.user.findUnique({
			where: { email: email.value },
		});

		if (!user) {
			this.logger.warn(`User with email: ${email.value} not found`);
			return null;
		}

		return UserMapper.toDomain(user);
	}

	public async findAll(): Promise<UserEntity[]> {
		this.logger.log(`Finding all users`);

		const users = await this.prisma.user.findMany();
		return users.map(UserMapper.toDomain);
	}

	public async create(user: UserEntity): Promise<void> {
		this.logger.log(`Creating user with ID: ${user.id.toValue()}`);
		const userPersistanceData = UserMapper.toPersistence(user);

		await this.prisma.user.create({
			data: userPersistanceData,
		});

		this.logger.log(`User with ID: ${user.id.toValue()} created successfully`);
		DomainEvents.dispatchEventsForAggregate(user.id);
	}

	public async update(user: UserEntity): Promise<void> {
		this.logger.log(`Updating user with ID: ${user.id.toValue()}`);
		const userPersistanceData = UserMapper.toPersistence(user);

		await this.prisma.user.update({
			where: { id: userPersistanceData.id },
			data: userPersistanceData,
		});
	}

	public async delete(id: UUIDUniqueEntityId): Promise<void> {
		this.logger.log(`Deleting user with ID: ${id.toValue()}`);

		await this.prisma.user.delete({
			where: { id: id.toValue() },
		});
	}
}
