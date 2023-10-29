import organizeDataItem from "./organizeDataItem";

interface FilterListItem {
  prop: string;
  value: string | boolean | number;
}

const restructureTheProperty = (property: string) =>
  property.indexOf(".") > -1 ? property.split(".") : property;

export default (filterList: FilterListItem[], data: Array<any>) => {
  let filteredData: Array<any> = [];
  if (!Array.isArray(data)) {
    return [];
  }
  filterList.forEach((filter: any, index: number) => {
    const propertySet: Array<string> | string = restructureTheProperty(
      filterList[index].prop,
    );
    const dataToBeFiltered: Array<any> =
      index === 0 ? [...data] : [...filteredData];
    filteredData = dataToBeFiltered.filter((item: any) =>
      filterList[index].value || typeof filterList[index].value === "boolean"
        ? filter.prop === "date"
          ? organizeDataItem(propertySet, item).indexOf(
              filterList[index].value,
            ) > -1
          : organizeDataItem(propertySet, item) === filterList[index].value
        : 1,
    );
  });
  return filteredData;
};
