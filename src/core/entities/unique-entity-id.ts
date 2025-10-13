export abstract class UniqueEntityID<T> {
	protected value: T;

	public toValue() {
		return this.value;
	}

	protected constructor(value?: T) {
		this.value = value;
	}

	public equals(id: UniqueEntityID<T>): boolean {
		return this.value === id.value;
	}
}
