import { ApiProperty } from "@nestjs/swagger";

export class UserResponseScalar {
	@ApiProperty({
		description: "ID do usuário",
		example: "123e4567-e89b-12d3-a456-426614174000",
	})
	id: string;

	@ApiProperty({
		description: "Nome do usuário",
		example: "João Silva",
	})
	name: string;

	@ApiProperty({
		description: "Email do usuário",
		example: "joao.silva@example.com",
	})
	email: string;

	@ApiProperty({
		description: "Idade do usuário",
		example: 30,
		required: false,
	})
	age?: number;

	@ApiProperty({
		description: "Indica se o usuário está ativo",
		example: true,
	})
	isActive: boolean;

	@ApiProperty({
		description: "Data de criação do usuário",
		example: "2023-10-05T14:48:00.000Z",
	})
	createdAt: Date;

	@ApiProperty({
		description: "Data da última atualização do usuário",
		example: "2023-10-10T10:20:30.000Z",
	})
	updatedAt: Date;
}
