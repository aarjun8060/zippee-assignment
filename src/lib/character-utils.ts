import type { Gender } from "../types";

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
