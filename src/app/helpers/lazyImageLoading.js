const createLazyListener = (selector, dataset) => () => {
  let images = document.querySelectorAll(selector);
  console.log(images.length);
  if (images.length) {
    images = [].slice.call(images);
    setTimeout(() => {
      images.forEach(lazyImage => {
        const { top, bottom } = lazyImage.getBoundingClientRect();
        const topIsUnderScreenOrHigher = top - 100 <= window.innerHeight;
        const botIsOnScreenOrBelow = bottom >= 0;
        const visible = lazyImage.style.display !== 'none';

        if (topIsUnderScreenOrHigher && botIsOnScreenOrBelow && visible) {
          lazyImage.src = lazyImage.dataset.src;

          setTimeout(() => {
            delete lazyImage.dataset[dataset];
          }, 200);
        }
      });
    }, 0);
  }
};

export default function lazyImageLoading(selector, dataset, parent = document) {
  console.log(23);
  const listener = createLazyListener(selector, dataset);
  listener();
  parent.addEventListener('scroll', listener);

  return {
    unsubscribe: () => parent.removeEventListener('scroll', listener),
    update: listener
  };
}
