import { ValueObject } from "@/core/entities/value-object";
import { InvalidEmailError } from "@/domain/accounts/application/use-cases/errors/invalid-email-error";

interface EmailVoProps {
	email: string;
}

export class Email extends ValueObject<EmailVoProps> {
	get value(): string {
		return this.props.email;
	}

	static create(email: string) {
		return new Email({ email: email.trim().toLowerCase() });
	}

	static validate(email: string): boolean {
		if (!email || email.length > 255) {
			return false;
		}

		const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (!regex.test(email)) {
			return false;
		}

		return true;
	}

	static format(email: string) {
		return email.trim().toLowerCase();
	}

	static createFromText(email: string): Email {
		const emailFormatted = Email.format(email);

		if (!Email.validate(emailFormatted)) {
			throw new InvalidEmailError(emailFormatted);
		}

		return new Email({ email: emailFormatted });
	}
}
