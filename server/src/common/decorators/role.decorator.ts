import {SetMetadata} from "@nestjs/common";

export const ROLE_METADATA = "role";
export const Role = (...roles: string[]) => SetMetadata(ROLE_METADATA, roles);