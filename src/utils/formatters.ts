/**
 * Format a number as currency
 * @param value Number to format
 * @param minimumFractionDigits Minimum fraction digits (default: 2)
 * @param maximumFractionDigits Maximum fraction digits (default: 2)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  value: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

/**
 * Format a number as a percentage
 * @param value Number to format (0-1)
 * @param minimumFractionDigits Minimum fraction digits (default: 2)
 * @param maximumFractionDigits Maximum fraction digits (default: 2)
 * @returns Formatted percentage string
 */
export const formatPercentage = (
  value: number,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
};

/**
 * Format a date to a readable string
 * @param date Date to format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string => {
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

/**
 * Truncate a string to a specified length
 * @param str String to truncate
 * @param maxLength Maximum length
 * @param suffix Suffix to add (default: '...')
 * @returns Truncated string
 */
export const truncateString = (
  str: string,
  maxLength: number,
  suffix = '...'
): string => {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + suffix;
};

/**
 * Format an address for display
 * @param address Ethereum address
 * @param startChars Number of starting characters to show (default: 6)
 * @param endChars Number of ending characters to show (default: 4)
 * @returns Formatted address
 */
export const formatAddress = (
  address: string,
  startChars = 6,
  endChars = 4
): string => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  
  return `${address.substring(0, startChars)}...${address.substring(
    address.length - endChars
  )}`;
};
