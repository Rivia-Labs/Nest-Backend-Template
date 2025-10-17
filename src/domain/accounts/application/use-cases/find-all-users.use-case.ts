import { Injectable, Logger } from "@nestjs/common";
import { UserEntity } from "../../enterprise/entities/user-entity";
import { UserRepository } from "../repositories/user-repository";

@Injectable()
export class FindAllUsersUseCase {
	private readonly logger = new Logger(FindAllUsersUseCase.name);

	constructor(private readonly userRepository: UserRepository) {}

	public async execute(): Promise<UserEntity[] | null> {
		this.logger.log("Finding all users");
		const users = await this.userRepository.findAll();
		this.logger.log(`Found ${users.length} users`);
		return users;
	}
}
