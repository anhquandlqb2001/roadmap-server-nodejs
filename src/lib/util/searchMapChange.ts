const recursiveSearch = (obj: any, searchKey: string, valueChange: boolean) => {
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (key === searchKey && value.hasOwnProperty("value")) {
      obj[key].value = valueChange;
    } else if (typeof value === "object") {
      recursiveSearch(value, searchKey, valueChange);
    }
  });
  return obj;
};

export default recursiveSearch