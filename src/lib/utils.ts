import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(date);
}

export function formatDateRange(start: Date, end: Date | null): string {
  const startDate = formatDate(start);
  if (!end) {
    return `${startDate} - Present`;
  }
  return `${startDate} - ${formatDate(end)}`;
}
