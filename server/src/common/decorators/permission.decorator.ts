import {SetMetadata} from "@nestjs/common";

export const PERMISSION_METADATA = "permission";

export interface PermissionDecoratorParams {
  requiredAll?: boolean;
  permissions: string[];
}

export function Permission({requiredAll = false, permissions}: PermissionDecoratorParams) {
  return SetMetadata(PERMISSION_METADATA, {requiredAll, permissions});
}