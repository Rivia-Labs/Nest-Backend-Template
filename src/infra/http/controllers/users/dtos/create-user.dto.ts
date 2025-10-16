import { ApiProperty } from "@nestjs/swagger";
import z from "zod";

export const createUserBodySchema = z
  .object({
    name: z.string().min(2).max(100),
    email: z.email(),
    age: z.number().min(0).max(150).optional(),
  })
  .describe("CreateUserBody");

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

export class CreateUserBodyDto implements CreateUserBodySchema {
  @ApiProperty({
    description: "Nome do usuário",
    minLength: 2,
    maxLength: 100,
    example: "João Silva",
  })
  name: string;

  @ApiProperty({
    description: "Email do usuário",
    format: "email",
    example: "joao.silva@example.com",
  })
  email: string;

  @ApiProperty({
    description: "Idade do usuário",
    type: "integer",
    minimum: 0,
    maximum: 150,
    example: 30,
    required: false,
  })
  age?: number;
}
