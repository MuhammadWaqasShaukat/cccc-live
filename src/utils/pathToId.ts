export const pathToId = (path: string) => {
  let hash = 0;
  for (let i = 0; i < path.length; i++) {
    hash = (hash << 5) - hash + path.charCodeAt(i);
    hash |= 0;
  }
  return "id-" + Math.abs(hash).toString(36);
};
