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
export class InterceptorResponse<T> {
  success: boolean;
  statusCode: number;
  detail: string;
  response: BaseApiResponseData<T> | BaseApiResponse;
  timestamp: string;
  path?: string;
}