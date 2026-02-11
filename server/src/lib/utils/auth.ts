import {RolePriority} from "@/types";
import {UserRole} from "@/modules/prisma/generated/enums";

type Comparison = "equal" | "higher";

interface IsAllowedActionParams {
  actionRole: UserRole;
  targetRole: UserRole;
  roleComparison?: Comparison;
}

export function isAllowedAction(
  {
    actionRole,
    targetRole,
    roleComparison = "equal",
  }: IsAllowedActionParams
): boolean {
  const actionPriority = RolePriority[actionRole];
  const targetPriority = RolePriority[targetRole];

  switch (roleComparison) {
    case "equal": {
      return actionPriority >= targetPriority;
    }
    case "higher": {
      return actionPriority > targetPriority;
    }
    default: {
      return false;
    }
  }
}