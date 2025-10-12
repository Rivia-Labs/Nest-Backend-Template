import { Injectable, Logger } from "@nestjs/common";
import { Either, success } from "@/core/either";
import { UserEntity } from "../../enterprise/entities/user-entity";
import { UserRepository } from "../repositories/user-repository";

type FindAllUsersResponse = Either<null, UserEntity[]>;

@Injectable()
export class FindAllUsersUseCase {
	private readonly logger = new Logger(FindAllUsersUseCase.name);

	constructor(private readonly userRepository: UserRepository) {}

	public async execute(): Promise<FindAllUsersResponse> {
		this.logger.log("Finding all users");
		const users = await this.userRepository.findAll();
		this.logger.log(`Found ${users.length} users`);

		return success(users);
	}
}
