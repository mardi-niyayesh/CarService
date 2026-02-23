import z from "zod";
import {formatZodError} from "@/lib";
import {ZodException} from "@/types";
import {Injectable, PipeTransform, BadRequestException} from '@nestjs/common';

@Injectable()
export class ZodPipe<T extends z.ZodTypeAny> implements PipeTransform {
  constructor(private readonly schema: T) {
    void this.transform;
  }

  transform(value: unknown): z.infer<T> {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException({
        statusCode: 400,
        errors: formatZodError(result.error),
        message: "Invalid request.",
      } as ZodException);
    }

    return result.data;
  }
}