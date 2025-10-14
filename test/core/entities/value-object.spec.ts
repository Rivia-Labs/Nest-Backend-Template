import { ValueObject } from "@/core/entities/value-object";

class TestValueObject extends ValueObject<{ name: string; age: number }> {
	constructor(props: { name: string; age: number }) {
		super(props);
	}
}

describe("ValueObject", () => {
	const vo1 = new TestValueObject({ name: "Alice", age: 25 });
	const vo2 = new TestValueObject({ name: "Alice", age: 25 });
	const vo3 = new TestValueObject({ name: "Bob", age: 30 });

	it("should return true when comparing two VOs with same props", () => {
		expect(vo1.equals(vo2)).toBe(true);
	});

	it("should return false when comparing two VOs with different props", () => {
		expect(vo1.equals(vo3)).toBe(false);
	});

	it("should return false when comparing with null", () => {
		expect(vo1.equals(null)).toBe(false);
	});

	it("should return false when comparing with undefined", () => {
		expect(vo1.equals(undefined)).toBe(false);
	});

	it("should return false when compared VO has undefined props", () => {
		const voWithoutProps = {} as ValueObject<any>;
		expect(vo1.equals(voWithoutProps)).toBe(false);
	});
});
