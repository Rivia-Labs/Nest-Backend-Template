import { Injectable, Logger } from "@nestjs/common";
import { Either, failure, success } from "@/core/either";
import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { UserEntity } from "../../enterprise/entities/user-entity";
import { UserRepository } from "../repositories/user-repository";

type FindUserByIdRequest = {
	id: string;
};

type FindUserByIdResponse = Either<ResourceNotFoundError, UserEntity>;

@Injectable()
export class FindUserByIdUseCase {
	private readonly logger = new Logger(FindUserByIdUseCase.name);

	constructor(private readonly userRepository: UserRepository) {}

	public async execute(data: FindUserByIdRequest): Promise<FindUserByIdResponse> {
		this.logger.log(`Finding user with ID: ${data.id}`);
		const id = new UUIDUniqueEntityId(data.id);

		const userExists = await this.userRepository.findById(id);
		if (!userExists) {
			this.logger.warn(`User with ID: ${data.id} not found`);
			return failure(new ResourceNotFoundError("Usuário"));
		}

		this.logger.log(`User with ID: ${data.id} found`);
		return success(userExists);
	}
}
