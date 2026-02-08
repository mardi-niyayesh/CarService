export interface BaseApiResponseType<T> {
  message: string;
  data: T;
}