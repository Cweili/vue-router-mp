import qs from 'querystringify';

export function parse(path) {
  const [
    p,
    q,
  ] = path.split('?');
  return {
    path: p,
    query: q ? qs.parse(q) : {},
  };
}

export function stringify(path, query) {
  return (path || '') + qs.stringify(query, '?');
}
