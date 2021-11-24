export interface RequestBody {
  markdown: string;
}

export interface ResponseSuccess {
  html: string;
}

export interface ResponseError {
  reason: string;
}

export enum ResponseErrorStatus {
  parseBody = 500,
  parseJSON = 400,
  validateInput = 400
}

export enum ResponseErrorMessage {
  parseBody = 'Failed to parse body',
  parseJSON = 'Invalid JSON',
  validateInput = 'Invalid input'
}
