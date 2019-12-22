export function format(salutation: string, first: string, middle: string, last: string): string {
  return (
    (salutation || '') +
    (first || '') +
    (middle ? ` ${middle}` : '') +
    (last ? ` ${last}` : '')
  );
}

export function isTouchCapable() {
  const prefixes = '-webkit-, -moz-, -o-, -ms-'.split(', ');
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  const mq = function(query) {
    return window.matchMedia(query).matches;
  };

  if (('ontouchstart' in window)
    || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  return mq(query);
}
