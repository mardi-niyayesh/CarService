import {SetMetadata} from "@nestjs/common";

export const PERMISSION_METADATA = "permission";

export const Permission = (requireAll?: boolean, ...permission: string[]) => SetMetadata(PERMISSION_METADATA, {requireAll, permission});