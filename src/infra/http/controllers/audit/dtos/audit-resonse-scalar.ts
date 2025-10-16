import { ApiProperty } from "@nestjs/swagger";

export class AuditResponseScalar {
	@ApiProperty({
		description: "ID do registro de auditoria",
		example: 1,
	})
	id: number;

	@ApiProperty({
		description: "Ação realizada",
		example: "create",
	})
	action: string;

	@ApiProperty({
		description: "ID do usuário que realizou a ação",
		example: "550e8400-e29b-41d4-a716-446655440000",
	})
	userId: string;

	@ApiProperty({
		description: "Data de criação do registro",
		example: "2023-10-05T14:48:00.000Z",
	})
	createdAt: Date;

	@ApiProperty({
		description: "Data de atualização do registro",
		example: "2023-10-05T14:48:00.000Z",
	})
	updatedAt: Date;
}
