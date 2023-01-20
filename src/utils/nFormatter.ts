export function nFormatter(num: number) {
  //조회수 'k m'
  if (num >= 100000000) {
    return (num / 100000000).toFixed(1).replace(/\.0$/, "") + "억";
  }
  if (num >= 10000) {
    return (num / 10000).toFixed(1).replace(/\.0$/, "") + "만";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "천";
  }
  return num;
}
