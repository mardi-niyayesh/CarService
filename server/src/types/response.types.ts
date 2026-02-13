export interface BaseApiResponse {
  message: string;
}

export interface BaseApiResponseData<T> extends BaseApiResponse {
  data: T;
}

export type ApiResponse<T extends void> = T extends void ? BaseApiResponse : BaseApiResponseData<T>;