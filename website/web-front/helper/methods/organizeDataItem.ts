// Use the given data item object and the property to find the property's value
export default (propertySet: Array<string> | string, dataItem: any) => {
  let i = 0;
  let dataItemValue: any = null;
  if (typeof propertySet === "string") {
    dataItemValue = dataItem[propertySet];
  } else {
    while (i < propertySet.length) {
      if (i === 0) {
        dataItemValue = dataItem[propertySet[i]];
      } else {
        dataItemValue = dataItemValue ? dataItemValue[propertySet[i]] : "";
      }
      i += 1;
    }
  }
  return dataItemValue;
};
