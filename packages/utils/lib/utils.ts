import { v7 } from 'uuid';
import { parse, isValid, addHours, addDays } from 'date-fns';
import { KNOWN_DATE_FORMATS } from './constants';

/**
 * Generates a UUID (Universally Unique Identifier) using the v7 format.
 * This format is based on time and is suitable for generating unique identifiers,
 * that can be sorted by creation time.
 * @returns {string} A UUID.
 */
export function generateUUID(): string {
  return v7();
}

/**
 * Returns a new `Date` object representing the time after adding the specified number of hours to the given time.
 *
 * The input `time` can be a `Date` object, a string (parsed using known date formats), or a timestamp (number).
 * If no `time` is provided, the current date and time is used.
 *
 * @param time - The base time to add hours to. Can be a `Date`, a date string, or a timestamp. Defaults to the current date and time.
 * @param hours - The number of hours to add. Defaults to 1.
 * @returns A new `Date` object representing the time after the specified number of hours.
 */
export function getTimeAfterHours(
  time: Date | string | number = new Date(),
  hours: number = 1,
): Date {
  return addHours(parseTime(time), hours);
}

/**
 * Returns a new `Date` object representing the time after a specified number of days from the given time.
 *
 * @param time - The starting time, which can be a `Date`, a date string, or a timestamp. Defaults to the current date and time.
 * @param days - The number of days to add to the starting time. Defaults to 30.
 * @returns A new `Date` object representing the time after the specified number of days.
 */
export function getTimeAfterDays(
  time: Date | string | number = new Date(),
  days: number = 30,
): Date {
  return addDays(parseTime(time), days);
}

/**
 * Parses the given time input into a `Date` object.
 *
 * Accepts a `Date` instance, a string, or a number (timestamp). If a string is provided,
 * it attempts to parse it using known date formats. If parsing fails or the input is invalid,
 * the current date and time is returned.
 *
 * @param time - The time to parse. Can be a `Date`, a date string, a timestamp, or omitted (defaults to now).
 * @returns A `Date` object representing the parsed time.
 */
export function parseTime(time: Date | string | number = new Date()) {
  let parsedTime = new Date();
  switch (typeof time) {
    case 'string':
      parsedTime = KNOWN_DATE_FORMATS.reduce((acc, format) => {
        const parsed = parse(time, format, new Date());
        return isValid(parsed) ? parsed : acc;
      }, new Date());
    case 'number':
      parsedTime = new Date(time);
      break;
    case 'object':
      if (time instanceof Date) parsedTime = time;
      break;
    case 'undefined':
      parsedTime = new Date();
      break;
    default:
      parsedTime = new Date();
  }
  return parsedTime;
}
