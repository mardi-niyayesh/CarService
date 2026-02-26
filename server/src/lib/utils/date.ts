/** static example date for responses */
export const date = new Date();

/** get local now date */
export function getLocalDate(result: "fa-IR" | "en-CA") {
  return new Date().toLocaleDateString(result);
}