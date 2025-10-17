import type { INestApplication } from "@nestjs/common";

import { DefaultFilter } from "./filters/default.filter";
import { DomainExceptionFilter } from "./filters/domain-exception.filter";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

export function configureError(app: INestApplication) {
	app.useGlobalFilters(new DefaultFilter(), new HttpExceptionFilter(), new DomainExceptionFilter());
}
