export function queryStringify(object: { [key: string]: any }): string {
  let queryString = '';
  let isFirst = true;

  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      const value = object[property];
      if (value !== null && typeof value !== 'undefined') {
        if (!isFirst) {
          queryString += '&';
        }

        queryString += encodeURIComponent(property) + '=';
        queryString += encodeURIComponent(value);
      }

      isFirst = false;
    }
  }

  return queryString;
}
