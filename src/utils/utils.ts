
export function format(salutation: string, first: string, middle: string, last: string): string {
  return (
    (salutation || '') +
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}
