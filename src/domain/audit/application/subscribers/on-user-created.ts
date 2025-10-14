import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { UserCreatedEvent } from "@/domain/accounts/enterprise/events/user-created.event";
import { RegisterEntity } from "../../enterprise/entities/register-entity";
import { Action, ActionType } from "../../enterprise/entities/value-object/action-vo";
import { AuditRepository } from "../repositories/audit-repository";

export class OnUserCreated implements EventHandler {
	private readonly auditRepository: AuditRepository;

	constructor(auditRepository: AuditRepository) {
		this.auditRepository = auditRepository;
		this.setupSubscriptions();
	}

	public setupSubscriptions(): void {
		DomainEvents.register(this.dispatchUserCreatedEvent.bind(this), UserCreatedEvent.name);
	}

	public async dispatchUserCreatedEvent({ user }: UserCreatedEvent) {
		const action = Action.createFromString(ActionType.CREATE);
		if (action.failure()) {
			throw action.value;
		}

		const register = RegisterEntity.create({
			userId: user.id,
			action: action.value,
		});

		await this.auditRepository.create(register);
	}
}
