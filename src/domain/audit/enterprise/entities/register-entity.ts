import { EntityBase } from "@/core/entities/entity-base";
import { NumericUniqueEntityId } from "@/core/entities/id/numeric-unique-entity-id";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Action } from "./value-object/action-vo";

type RegisterEntityProps = {
	userId: UniqueEntityID<string>;
	action: Action;
	createdAt?: Date;
	updatedAt?: Date;
};
export class RegisterEntity extends EntityBase<RegisterEntityProps, NumericUniqueEntityId> {
	static create(props: RegisterEntityProps, id?: NumericUniqueEntityId) {
		const register = new RegisterEntity(
			{
				...props,
				createdAt: props.createdAt ?? new Date(),
				updatedAt: props.updatedAt ?? new Date(),
			},
			id
		);

		return register;
	}
}
