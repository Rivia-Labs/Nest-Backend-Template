import { InvalidEmailError } from "@/domain/accounts/application/use-cases/errors/invalid-email-error";
import { Email } from "@/domain/accounts/enterprise/entities/value-object/email-vo";

describe("Email Value Object", () => {
	it("deve criar um Email com sucesso usando create()", () => {
		const email = Email.create("test@example.com");

		expect(email).toBeInstanceOf(Email);
		expect(email.value).toBe("test@example.com");
	});

	it("deve retornar false para emails vazios ou nulos na validação", () => {
		expect(Email.validate("")).toBe(false);
		expect(Email.validate("   ")).toBe(false);
		expect(Email.validate(null as unknown as string)).toBe(false);
	});

	it("deve retornar false se o email tiver mais de 255 caracteres", () => {
		const longEmail = "a".repeat(256) + "@example.com";
		expect(Email.validate(longEmail)).toBe(false);
	});

	it("deve retornar false para emails inválidos (sem arroba, formato incorreto, etc)", () => {
		const invalidEmails = [
			"plainaddress",
			"@missingusername.com",
			"username@.com",
			"username@domain",
			"username@domain..com",
			"username@domain,com",
			"username@domain@domain.com",
		];

		for (const invalid of invalidEmails) {
			expect(Email.validate(invalid)).toBe(false);
		}
	});

	it("deve retornar true para emails válidos", () => {
		const validEmails = [
			"user@example.com",
			"user.name+tag@example.co.uk",
			"u-ser_123@example.io",
			"USER@EXAMPLE.COM",
		];

		for (const valid of validEmails) {
			expect(Email.validate(valid)).toBe(true);
		}
	});

	it("deve formatar o email removendo espaços e colocando em minúsculas", () => {
		const formatted = Email.format("   TEST@Example.COM  ");
		expect(formatted).toBe("test@example.com");
	});

	it("deve criar um Email válido a partir de texto usando createFromText()", () => {
		const email = Email.createFromText("   USER@Example.com  ");
		expect(email).toBeInstanceOf(Email);
		expect(email.value).toBe("user@example.com");
	});

	it("deve lançar InvalidEmailError se createFromText() receber email inválido", () => {
		expect(() => Email.createFromText("invalid-email")).toThrow(InvalidEmailError);
		expect(() => Email.createFromText("invalid-email")).toThrow("invalid-email");
	});

	it("getter value deve retornar o valor correto", () => {
		const email = Email.create("hello@world.com");
		expect(email.value).toBe("hello@world.com");
	});
});
