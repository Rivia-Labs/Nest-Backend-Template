import { Injectable, Logger } from "@nestjs/common";
import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { UserEntity } from "../../enterprise/entities/user-entity";
import { UserRepository } from "../repositories/user-repository";

type FindUserByIdRequest = {
	id: string;
};

@Injectable()
export class FindUserByIdUseCase {
	private readonly logger = new Logger(FindUserByIdUseCase.name);

	constructor(private readonly userRepository: UserRepository) {}

	public async execute(data: FindUserByIdRequest): Promise<UserEntity> {
		this.logger.log(`Finding user with ID: ${data.id}`);
		const id = new UUIDUniqueEntityId(data.id);
		const userExists = await this.userRepository.findById(id);
		if (!userExists) {
			this.logger.warn(`User with ID: ${data.id} not found`);
			throw new ResourceNotFoundError("Usuário");
		}
		return userExists;
	}
}
