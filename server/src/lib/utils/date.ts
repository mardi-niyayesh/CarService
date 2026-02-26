/** static example date for responses */
export const date = new Date();

/** Get present tense and convert to string */
export const getServerTime: () => string = () => new Date().toISOString();

/** get local now date */
export function getLocalDate(result: "fa-IR" | "en-CA") {
  return new Date().toLocaleDateString(result);
}