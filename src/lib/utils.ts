import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Reorders an array by moving an item from one index to another
 * @param array The array to reorder
 * @param fromIndex The index of the item to move
 * @param toIndex The index where the item should be moved to
 * @returns A new array with the item moved to the new position
 */
export function reorderArray<T>(array: T[], fromIndex: number, toIndex: number): T[] {
  // Create a copy of the array to avoid mutating the original
  const result = [...array]

  // Remove the item from the original position
  const [removed] = result.splice(fromIndex, 1)

  // Insert the item at the new position
  result.splice(toIndex, 0, removed)

  return result
}
