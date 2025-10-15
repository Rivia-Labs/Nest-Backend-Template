import {
	CallHandler,
	ConflictException,
	ExecutionContext,
	Injectable,
	InternalServerErrorException,
	NestInterceptor,
	NotFoundException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Either, Failure } from "@/core/either";
import { ResourceAlreadyExistsError } from "@/core/errors/resource-already-exists-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";

@Injectable()
export class EitherInterceptor implements NestInterceptor {
	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((result: Either<Error, unknown> | any) => {
				if (result instanceof Failure && result.failure()) {
					const error = result.value;
					// Mapeamento centralizado de erros → exceções HTTP
					if (error instanceof ResourceNotFoundError) {
						throw new NotFoundException(error.message);
					}

					if (error instanceof ResourceAlreadyExistsError) {
						throw new ConflictException(error.message);
					}

					// fallback genérico
					throw new InternalServerErrorException(error.message || "Unexpected error occurred");
				}
				return result;
			})
		);
	}
}
