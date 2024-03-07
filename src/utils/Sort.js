export const sortAlphanumeric = (fieldName) => (a, b) => {
  const getProperty = (obj, propPath) => {
    const props = propPath.split('.');
    return props.reduce((currentObj, property) => {
      return currentObj[property];
    }, obj);
  };

  const valueA = getProperty(a, fieldName);
  const valueB = getProperty(b, fieldName);

  // Chuyển đổi hai giá trị thành chuỗi để so sánh
  const stringA = valueA.toString();
  const stringB = valueB.toString();

  // Sử dụng biểu thức chính quy để tách ký tự và số từ chuỗi
  const regex = /([a-zA-Z]+)|([0-9]+)/g;
  const partsA = stringA.match(regex);
  const partsB = stringB.match(regex);

  // So sánh từng phần của chuỗi
  for (let i = 0; i < Math.min(partsA.length, partsB.length); i++) {
    const partA = partsA[i];
    const partB = partsB[i];

    // Nếu một phần là ký tự và phần kia là số, sắp xếp theo thứ tự ký tự trước
    if (isNaN(partA) !== isNaN(partB)) {
      return isNaN(partA) ? -1 : 1;
    }

    // Nếu cả hai phần đều là số, sắp xếp theo giá trị số
    if (!isNaN(partA) && !isNaN(partB)) {
      const numA = parseInt(partA, 10);
      const numB = parseInt(partB, 10);
      if (numA !== numB) {
        return numA - numB;
      }
    }

    // Nếu cả hai phần đều là ký tự, sắp xếp theo thứ tự ký tự alphabet
    if (isNaN(partA) && isNaN(partB)) {
      if (partA !== partB) {
        return partA.localeCompare(partB);
      }
    }
  }

  // Nếu các phần trước đó của chuỗi giống nhau, sắp xếp theo độ dài của chuỗi
  return stringA.length - stringB.length;
};

export const sortDateNewst = (value) => (a, b) => {
  const dateA = new Date(a.dateSubmitted);
  const dateB = new Date(b.dateSubmitted);
  return dateB - dateA;
};

export const sortAlphabet = (value) => (a, b) => {
  const itemA = a[value].toString().toLowerCase();
  const itemB = b[value].toString().toLowerCase();
  return itemA.localeCompare(itemB);
};
