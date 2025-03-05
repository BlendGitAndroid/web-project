// const main = () => {
//   setTimeout(() => {
//     console.log("hello world");
//   }, 1000);
// };

// main();

const main = () => {
  setTimeout(() => {
    console.log("hello world");
    setTimeout(() => {
      console.log("hello world");
      setTimeout(() => {
        console.log("hello world");
      }, 1000);
    }, 1000);
  }, 1000);
};

main();

// @ts-ignore
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// @ts-ignore
const mainAsync = async () => {
  await delay(1000);
  console.log("第一秒");
  await delay(1000);
  console.log("第二秒");
  await delay(1000);
  console.log("第三秒");
};

mainAsync();
