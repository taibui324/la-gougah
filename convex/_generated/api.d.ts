/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as banners from "../banners.js";
import type * as contactSettings from "../contactSettings.js";
import type * as http from "../http.js";
import type * as init from "../init.js";
import type * as lib_auth from "../lib/auth.js";
import type * as menuItems from "../menuItems.js";
import type * as posts from "../posts.js";
import type * as storage from "../storage.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  banners: typeof banners;
  contactSettings: typeof contactSettings;
  http: typeof http;
  init: typeof init;
  "lib/auth": typeof lib_auth;
  menuItems: typeof menuItems;
  posts: typeof posts;
  storage: typeof storage;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
