import { QueryCtx, MutationCtx } from "../_generated/server";
import { auth } from "../auth";

export type Role = "admin" | "editor" | "user";

export async function getCurrentUser(ctx: QueryCtx | MutationCtx) {
  const userId = await auth.getUserId(ctx);
  if (!userId) {
    return null;
  }
  
  const user = await ctx.db.get(userId);
  return user;
}

export async function requireAuth(ctx: QueryCtx | MutationCtx) {
  const user = await getCurrentUser(ctx);
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}

export async function requireRole(ctx: QueryCtx | MutationCtx, requiredRole: Role | Role[]) {
  const user = await requireAuth(ctx);
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  if (!roles.includes(user.role)) {
    throw new Error(`Access denied. Required role: ${roles.join(" or ")}`);
  }
  
  return user;
}

export async function requireAdminOrEditor(ctx: QueryCtx | MutationCtx) {
  return requireRole(ctx, ["admin", "editor"]);
}

export async function requireAdmin(ctx: QueryCtx | MutationCtx) {
  return requireRole(ctx, "admin");
}

export function hasPermission(userRole: Role, requiredRole: Role | Role[]): boolean {
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  return roles.includes(userRole);
}

export function canManagePosts(userRole: Role): boolean {
  return hasPermission(userRole, ["admin", "editor"]);
}

export function canManageUsers(userRole: Role): boolean {
  return hasPermission(userRole, "admin");
}

export function canManageSettings(userRole: Role): boolean {
  return hasPermission(userRole, "admin");
} 