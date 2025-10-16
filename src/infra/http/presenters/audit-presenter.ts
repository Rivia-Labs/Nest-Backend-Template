import { RegisterEntity } from "@/domain/audit/enterprise/entities/register-entity";

export class AuditPresenter {
	public static toHttp(audit: RegisterEntity) {
		return {
			id: audit.id.toValue(),
			action: audit.props.action.value,
			userId: audit.props.userId.toValue(),
			createdAt: audit.props.createdAt,
			updatedAt: audit.props.updatedAt,
		};
	}

	public static toHttpList(audits: RegisterEntity[]) {
		return audits.map(audit => this.toHttp(audit));
	}
}
