import { Injectable, Logger } from "@nestjs/common";
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error";
import { UserEntity } from "../../enterprise/entities/user-entity";
import { Email } from "../../enterprise/entities/value-object/email-vo";
import { UserStatus, UserStatusEnum } from "../../enterprise/entities/value-object/user-status-vo";
import { UserRepository } from "../repositories/user-repository";

type CreateUserRequest = {
	email: string;
	name: string;
	age?: number;
};

type CreateUserResponse = {
	id: string;
};

@Injectable()
export class CreateUserUseCase {
	private readonly logger = new Logger(CreateUserUseCase.name);

	constructor(private readonly userRepository: UserRepository) {}

	public async execute(data: CreateUserRequest): Promise<CreateUserResponse> {
		const emailVO = Email.createFromText(data.email);
		this.logger.log(`Creating user with email: ${emailVO.value}`);
		const userExists = await this.userRepository.findByEmail(emailVO);
		if (userExists) {
			throw new ResourceAlreadyExistsError("Usuário com esse email");
		}
		const status = UserStatus.create(UserStatusEnum.ACTIVE);
		const user = UserEntity.create({
			email: emailVO,
			name: data.name,
			age: data.age,
			status: status,
		});
		this.logger.log(`User created with ID: ${user.id.toString()}`);
		await this.userRepository.create(user);
		return { id: user.id.toValue() };
	}
}
