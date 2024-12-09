/**
 * An array of routes that does not require authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];
/**
 * An array of routes that are used for authentication
 * These routes will redirect logged users to settings
 * @type {string[]}
 */

export const authRoutes = ["/auth/login", "/auth/register"];
/**
 * A prefix for API authentication routes
 * Routes that start with the prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings";
