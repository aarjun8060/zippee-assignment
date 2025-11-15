import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPageNumber(url: string) {
  const match = url.match(/[?&]page=(\d+)/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 1;
}