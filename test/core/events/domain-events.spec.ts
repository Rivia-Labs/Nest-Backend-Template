import { AggregateRoot } from "@/core/entities/aggregate-root";
import { UUIDUniqueEntityId } from "@/core/entities/id/uuid-unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { DomainEvents } from "@/core/events/domain-events";

class CustomDomainEvent implements DomainEvent<UUIDUniqueEntityId> {
	public occurredAt: Date;
	private aggregate: CustomAggregate;

	constructor(aggregate: CustomAggregate) {
		this.aggregate = aggregate;
		this.occurredAt = new Date();
	}

	public getAggregateId(): UUIDUniqueEntityId {
		return this.aggregate.id;
	}
}

class AnotherDomainEvent implements DomainEvent<UUIDUniqueEntityId> {
	public occurredAt: Date;
	constructor(public aggregate: CustomAggregate) {
		this.occurredAt = new Date();
	}

	public getAggregateId(): UUIDUniqueEntityId {
		return this.aggregate.id;
	}
}

class CustomAggregate extends AggregateRoot<null, UUIDUniqueEntityId> {
	static create() {
		const aggregate = new CustomAggregate(null, new UUIDUniqueEntityId());
		aggregate.addDomainEvent(new CustomDomainEvent(aggregate));
		return aggregate;
	}

	static createWithAnotherEvent() {
		const aggregate = new CustomAggregate(null, new UUIDUniqueEntityId());
		aggregate.addDomainEvent(new AnotherDomainEvent(aggregate));
		return aggregate;
	}
}

describe("Domain Events Unit Tests", () => {
	beforeEach(() => {
		DomainEvents.clearHandlers();
		DomainEvents.clearMarkedAggregates();
		jest.clearAllMocks();
	});

	it("should be able to dispatch and listen to events", () => {
		const callbackSpy = jest.fn();

		DomainEvents.register(callbackSpy, CustomDomainEvent.name);

		const aggregate = CustomAggregate.create();
		expect(aggregate.domainEvents).toHaveLength(1);

		DomainEvents.dispatchEventsForAggregate(aggregate.id);

		expect(callbackSpy).toHaveBeenCalledTimes(1);
		expect(aggregate.domainEvents).toHaveLength(0);
	});

	it("should call multiple handlers for the same event", () => {
		const spy1 = jest.fn();
		const spy2 = jest.fn();

		DomainEvents.register(spy1, CustomDomainEvent.name);
		DomainEvents.register(spy2, CustomDomainEvent.name);

		const aggregate = CustomAggregate.create();
		DomainEvents.dispatchEventsForAggregate(aggregate.id);

		expect(spy1).toHaveBeenCalledTimes(1);
		expect(spy2).toHaveBeenCalledTimes(1);
	});

	it("should call only the handler registered for the event type", () => {
		const spyCustom = jest.fn();
		const spyAnother = jest.fn();

		DomainEvents.register(spyCustom, CustomDomainEvent.name);
		DomainEvents.register(spyAnother, AnotherDomainEvent.name);

		const aggregate1 = CustomAggregate.create();
		const aggregate2 = CustomAggregate.createWithAnotherEvent();

		DomainEvents.dispatchEventsForAggregate(aggregate1.id);
		DomainEvents.dispatchEventsForAggregate(aggregate2.id);

		expect(spyCustom).toHaveBeenCalledTimes(1);
		expect(spyAnother).toHaveBeenCalledTimes(1);
	});

	it("should clear all handlers", () => {
		const spy = jest.fn();
		DomainEvents.register(spy, CustomDomainEvent.name);

		expect(DomainEvents["handlersMap"][CustomDomainEvent.name]).toHaveLength(1);

		DomainEvents.clearHandlers();
		expect(DomainEvents["handlersMap"][CustomDomainEvent.name]).toBeUndefined();
	});

	it("should remove aggregate from marked list after dispatch", () => {
		const spy = jest.fn();
		DomainEvents.register(spy, CustomDomainEvent.name);

		const aggregate = CustomAggregate.create();
		expect(DomainEvents["markedAggregates"]).toHaveLength(1);

		DomainEvents.dispatchEventsForAggregate(aggregate.id);

		expect(DomainEvents["markedAggregates"]).toHaveLength(0);
	});
});
