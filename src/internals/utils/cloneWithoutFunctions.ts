export function cloneWithoutFunctions(object: object) {
  const copy = Object.assign({}, object);
  // @ts-ignore
  Object.keys(copy).forEach((key) => typeof copy[key] === 'function' && delete copy[key]);
  return copy;
}
