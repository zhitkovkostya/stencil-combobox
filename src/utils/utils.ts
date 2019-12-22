export function format(first: string, middle: string, last: string): string {
  return (
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

  if ('ontouchstart' in window) {
    return true;
  }

  return mq(query);
}
