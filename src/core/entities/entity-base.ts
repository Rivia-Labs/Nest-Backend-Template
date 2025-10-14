import { UniqueEntityID } from "./unique-entity-id";

export abstract class EntityBase<T, ID> {
	private _id: UniqueEntityID<ID>;
	protected _props: T;

	protected constructor(props: T, id?: UniqueEntityID<ID>) {
		this._id = id;
		this._props = props;
	}

	public get id(): UniqueEntityID<ID> {
		return this._id;
	}

	public get props(): T {
		return this._props;
	}

	public equals(entity: EntityBase<any, any>): boolean {
		if (entity === this) {
			return true;
		}

		return false;
	}
}
