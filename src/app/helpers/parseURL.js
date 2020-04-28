export default function(url) {
  const parseResult = url.match(/\w+\/\d+$/gi)[0].split('/');

  return {
    itemType: parseResult[0],
    id: parseResult[1]
  };
}
