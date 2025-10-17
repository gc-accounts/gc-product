// src/components/utils/getOriginalTrafficSource.ts

/**
 * Extracts and normalizes the "Original Traffic Source" from UTM data.
 * @param utm UTM tracking data object (key-value pairs)
 * @returns A normalized traffic source string.
 */
export function getOriginalTrafficSource(
  utm: Record<string, string | undefined> | undefined
): string {
  if (!utm || typeof utm !== "object") return "";

  const source = utm["Original Traffic Source"]?.toLowerCase() ?? "";

  // Normalize specific values
  if (source === "ppc") return "adwords";

  return utm["Original Traffic Source"] ?? "";
}
