import { HttpStatus } from '@nestjs/common';

interface Params {
  code: string;
  message: string;
  status?: HttpStatus;
  causes?: string[];
}

export class BusinessException extends Error {
  readonly code: string;
  readonly status: HttpStatus;
  readonly causes: string[];

  constructor(params: Params) {
    super(params.message);
    this.code = params.code;
    this.causes = params.causes ?? [];
    this.status = params.status ?? HttpStatus.BAD_REQUEST;
  }
}
