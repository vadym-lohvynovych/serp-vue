import parseUrl from './parseURL';

export default function(url, route, router) {
  const { itemType, id } = parseUrl(url);

  if (route.params.id === id && route.params.type === itemType) return;

  router.push(`/${itemType}/${id}`);
}
