export default function sortRankingList(data: Array<any>) {
  let newData: Array<any> = [...data];
  return newData.sort(
    (a: any, b: any) => parseInt(a.ranking) - parseInt(b.ranking),
  );
}
