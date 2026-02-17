import {UserInclude} from "@/modules/prisma/generated/models/User";

export const userIncludes: UserInclude = {
  userRoles: {
    include: {
      role: {
        include: {
          rolePermissions: {
            include: {permission: true}
          }
        }
      }
    }
  }
};