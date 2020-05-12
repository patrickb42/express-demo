interface FilterObjectArgs<T> {
  sourceObject: {
    [key: string]: any,
  },
  filter: T,
}

export const filterObject = <T>({ sourceObject, filter }: FilterObjectArgs<T>) => Object
  .keys(filter)
  .reduce((acc, key: string) => {
    acc[key] = sourceObject[key];
    return acc;
  }, {}) as T;

export default {};
