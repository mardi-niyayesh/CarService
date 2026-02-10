import {SetMetadata} from "@nestjs/common";
import {UserRole} from "@/modules/prisma/generated/enums";

export const Role = (role: UserRole) => SetMetadata("role", role);