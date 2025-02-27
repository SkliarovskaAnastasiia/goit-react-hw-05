import { format } from 'date-fns';

export function formatCreatedDate(date) {
  return format(new Date(date), 'dd MMM yyyy p');
}
