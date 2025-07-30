
let a = ["apple", "mango", "banana"];
let aList = a.map((x, index) => {
  return `${index}.${x}`;
});

console.log(aList);

// export default function App() {
//   let fruit = [1, 3, 2, 5];
//   let fruitList = fruit.map((f, index) => {
//     return <li key={index}>{f}</li>;
//   });
//   return <ul>{fruitList}</ul>;
// }
