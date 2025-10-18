import { RegisterEntity } from "@/domain/audit/enterprise/entities/register-entity";
import { AuditResponseScalar } from "./audit-response-scalar";

export class AuditPresenter {
	public static toHttp(audit: RegisterEntity): AuditResponseScalar {
		return {
			id: audit.id.toValue(),
			action: audit.props.action.value,
			userId: audit.props.userId.toValue(),
			createdAt: audit.props.createdAt,
			updatedAt: audit.props.updatedAt,
		};
	}

	public static toHttpList(audits: RegisterEntity[]): AuditResponseScalar[] {
		return audits.map(audit => this.toHttp(audit));
	}
}
