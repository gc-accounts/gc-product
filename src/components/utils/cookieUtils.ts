import Cookies from "js-cookie";

/**
 * Retrieves the value of the '_ga' cookie.
 * If multiple '_ga' cookies exist, returns the first one.
 * @returns {string | undefined} The value of the '_ga' cookie, or undefined if not found.
 */
export function getGaCookieValue(): string | undefined {
  const allCookies = Cookies.get();

  // Return _ga cookie if present
  if (allCookies && allCookies._ga) {
    return allCookies._ga;
  }

  // Fallback: directly get cookie
  return Cookies.get("_ga");
}

/**
 * Retrieves the value of a specific cookie by name.
 * @param name The name of the cookie to retrieve.
 * @returns The cookie value, or undefined if not found.
 */
export function getCookieValue(name: string): string | undefined {
  return Cookies.get(name);
}
