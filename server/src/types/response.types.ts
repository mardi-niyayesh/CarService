export interface BaseApiResponse {
  message: string;
}

export interface BaseApiResponseData<T> extends BaseApiResponse {
  data: T;
}

export type ApiResponse<T> = T extends void ? BaseApiResponse : BaseApiResponseData<T>;