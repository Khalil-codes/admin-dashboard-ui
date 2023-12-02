export function padArrayEnd<T extends unknown>(
  arr: T[],
  len: number,
  padding: unknown
) {
  return arr.concat(Array(len - arr.length).fill(padding));
}
