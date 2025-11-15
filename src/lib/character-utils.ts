import type { Gender } from "../types";

/**
 * @param gender - The gender of the character
 * @returns The gender icon for the character
 */
export const getGenderIcon = (gender: Gender) => {
  switch (gender) {
    case "male":
      return "♂";
    case "female":
      return "♀";
    default:
      return "⚧";
  }
};

/**
 * @param gender - The gender of the character
 * @returns The gender color for the character
 */
export const getGenderColor = (gender: Gender) => {
  switch (gender) {
    case "male":
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
    case "female":
      return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
  }
};

/**
 * Formats a date string to dd-MM-yyyy format
 * @param dateString - ISO date string (e.g., "2014-12-09T13:50:51.644000Z")
 * @returns Formatted date string (e.g., "09-12-2014")
 */
export const formatDateAdded = (
  dateString: string | undefined
): string | null => {
  if (!dateString) return null;

  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return null;
  }
};

/**
 * Converts height from cm to meters
 * @param height - Height in cm as string
 * @returns Height in meters as string, or null if invalid
 */
export const convertHeightToMeters = (
  height: string | undefined
): string | null => {
  if (!height || height === "unknown" || height === "n/a") return null;

  try {
    const heightInCm = parseFloat(height);
    if (isNaN(heightInCm)) return null;
    const heightInMeters = (heightInCm / 100).toFixed(2);
    return `${heightInMeters} m`;
  } catch (error) {
    console.error("Error converting height:", error);
    return null;
  }
};
