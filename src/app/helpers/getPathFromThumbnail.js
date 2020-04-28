export default function(thumbnail) {
  return (
    thumbnail && `${thumbnail.path}/portrait_uncanny.${thumbnail.extension}`
  );
}
