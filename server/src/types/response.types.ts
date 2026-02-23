/** base response for exceptions and ok responses */
interface BaseResponse {
  success: boolean;
  statusCode: number;
  detail: string;
  timestamp: string;
  path?: string;
}

/** API Responses without data */
export interface BaseApiResponse {
  message: string;
}

/** API Responses with data */
export interface BaseApiResponseData<T> extends BaseApiResponse {
  data: T;
}

/** Base API Responses */
export type ApiResponse<T> = T extends void ? BaseApiResponse : BaseApiResponseData<T>;

/** schema response when request is ok */
export interface InterceptorResponse<T> extends BaseResponse {
  response: BaseApiResponseData<T> | BaseApiResponse;
}

/** params type for get schema for swagger when zod validate not success */
export interface ZodFieldError {
  field: string;
  error: string;
}

export interface BaseException extends BaseResponse {
  message: string;
  error: string;
}

export interface ZodException extends BaseResponse {
  message: string;
  errors: ZodFieldError[];
}

export type ExceptionResponse<T> = T extends void ? BaseException : ZodException;