// export default function moneyFormatter(num) {
//   let p = num.toFixed(1).split('.');
//   return (
//     ' ' +
//     p[0]
//       .split('')
//       .reverse()
//       .reduce(function (acc, num, i, orig) {
//         return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
//       }, '') +
//     '.' +
//     p[1]
//   );
// }
export default function moneyFormatter(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}