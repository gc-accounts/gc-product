// utils/cookieUtils.js
// This file does NOT need "use client" if it only contains pure functions
// that are then imported into a client component.

// import Cookies from 'js-cookie';
import Cookies from 'js-cookie'

/**
 * Retrieves the value of the '_ga' cookie.
 * If multiple '_ga' cookies exist (e.g., for different subdomains or paths),
 * this function will return the first one it finds.
 *
 * @returns {string | undefined} The value of the '_ga' cookie, or undefined if not found.
 */
export function getGaCookieValue() {
  // Cookies.get() with no arguments returns an object of all cookies
  // where keys are cookie names and values are cookie values.
  const allCookies = Cookies.get();

  // Check if '_ga' cookie exists in the object
  if (allCookies && allCookies._ga) {
    // console.log('ga cleint id -----------------', allCookies._ga);
    
    return allCookies._ga;
  }

  // If you want to be more explicit and handle cases where
  // there might be multiple cookies with the same name but different paths/domains,
  // you might need to iterate or use a more specific approach if js-cookie
  // doesn't return the exact one you need. However, Cookies.get('_ga')
  // typically returns the most specific/applicable one.
  // For simplicity, we'll rely on Cookies.get('_ga') directly here.
  return Cookies.get('_ga');
}

// You can also create a more generic getter if needed:
/**
 * Retrieves the value of a specific cookie by name.
 * @param {string} name The name of the cookie to retrieve.
 * @returns {string | undefined} The value of the cookie, or undefined if not found.
 */
export function getCookieValue(name) {
  return Cookies.get(name);
}
