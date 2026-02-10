import {SetMetadata} from "@nestjs/common";
import {UserRole} from "@/modules/prisma/generated/enums";

export const ROLE_METADATA = "role";
export const Role = (role: UserRole) => SetMetadata(ROLE_METADATA, role);