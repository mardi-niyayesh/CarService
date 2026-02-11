import z from "zod";
import {BaseApiResponseType} from "@/types";

export class ApiResponse<T> {
  success: boolean;
  statusCode: number;
  detail: string;
  response: BaseApiResponseType<T>;
  timestamp: string;
  path?: string;
}

export const UUID4Schema = z.object({
  id: z.uuidv4()
});

export type UUID4Type = z.infer<typeof UUID4Schema>;

export const UUID4Dto = {
  name: "id",
  type: String,
  description: "UUID",
  example: "d228cc19-b8c9-41c4-8c70-c2c6effb05ca"
};