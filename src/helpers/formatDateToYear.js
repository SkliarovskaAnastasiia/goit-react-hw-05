import { format } from 'date-fns';

export function formatDateToYear(date) {
  return format(new Date(date), 'y');
}
