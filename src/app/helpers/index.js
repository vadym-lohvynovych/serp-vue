const createLazyListener = (selector, dataset) => () => {
  let images = document.querySelectorAll(selector);
  if (images.length) {
    images = Array.from(images);
    images.forEach(lazyImage => {
      const { top, bottom } = lazyImage.getBoundingClientRect();
      const topIsUnderScreenOrHigher = top - 100 <= window.innerHeight;
      const botIsOnScreenOrBelow = bottom >= 0;
      const visible = lazyImage.style.display !== 'none';

      if (topIsUnderScreenOrHigher && botIsOnScreenOrBelow && visible) {
        lazyImage.src = lazyImage.dataset.src;
        //set timeout to remove dataset styles from image a little bit later
        setTimeout(() => delete lazyImage.dataset[dataset], 200);
      }
    });
  }
};

function parseItemURL(url) {
  const parseResult = url.match(/\w+\/\d+$/gi)[0].split('/');

  return {
    itemType: parseResult[0],
    id: parseResult[1]
  };
}

export function lazyImageLoading(selector, dataset, parent = window) {
  const listener = createLazyListener(selector, dataset);
  listener();
  parent.addEventListener('scroll', listener);

  return {
    unsubscribe: () => parent.removeEventListener('scroll', listener),
    update: listener
  };
}

export function changeItemRoute(url, route, router) {
  const { itemType, id } = parseItemURL(url);

  if (route.params.id === id && route.params.type === itemType) return;

  router.push(`/${itemType}/${id}`);
}

export function getPathFromThumbnail(thumbnail) {
  return (
    thumbnail && `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`
  );
}

export function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

// export function
