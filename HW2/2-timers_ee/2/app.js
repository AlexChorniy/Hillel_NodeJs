console.log("before");
let c = 0;
const sum = () => {
  for (let i = 0; i < 99999999; i++) {
    c += i * i;
  }
};

setTimeout(() => {
  console.log("timeout 1");
  sum();
  setTimeout(() => {
    console.log("after sum", c);
  }, 0);
}, 2);

setTimeout(() => {
  console.log("timeout 2");
}, 0);

sum();

console.log("after", c);
