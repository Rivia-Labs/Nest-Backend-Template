import { ValueObject } from "@/core/entities/value-object";
import { InvalidActionError } from "@/domain/audit/application/use-cases/errors/invalid-action-error";

export enum ActionType {
	CREATE = "create",
	READ = "read",
	UPDATE = "update",
	DELETE = "delete",
}

export class Action extends ValueObject<{ type: ActionType }> {
	get value(): ActionType {
		return this.props.type;
	}

	static create(type: ActionType): Action {
		return new Action({ type });
	}

	static isValid(action: string): action is ActionType {
		return Object.values(ActionType).includes(action as ActionType);
	}

	static createFromString(action: string): Action {
		if (!this.isValid(action)) {
			throw new InvalidActionError(action);
		}

		return new Action({ type: action as ActionType });
	}
}
