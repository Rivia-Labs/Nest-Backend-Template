import { UserEntity } from "@/domain/accounts/enterprise/entities/user-entity";

export class UserPresenter {
	public static toHttp(user: UserEntity) {
		return {
			id: user.id.toValue(),
			name: user.props.name,
			email: user.props.email.value,
			isActive: user.props.status.isActive(),
			createdAt: user.props.createdAt,
			updatedAt: user.props.updatedAt,
		};
	}

	public static toHttpList(users: UserEntity[]) {
		return users.map(user => this.toHttp(user));
	}
}
