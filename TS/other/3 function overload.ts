function reverse(string: string): string;
function reverse(stringArray: string[]): string[];

function reverse(stringOrArray: string | string[]) {
  if (typeof stringOrArray == "string") {
    return stringOrArray.split("").reverse().join("");
  } else {
    return stringOrArray.slice().reverse();
  }
}

const hello = reverse("hello");
const h_e_l_l_o = reverse(["h", "e", "l", "l", "o"]);

function makeDate(timestamp: number): Date;
function makeDate(year: number, month: number, day: number): Date;

function makeDate(
  timestampOrYear: number,
  month?: number,
  day?: number
) {
  if (month != null && day != null) {
    return new Date(timestampOrYear, month - 1, day);
  } else {
    return new Date(timestampOrYear);
  }
}

const day1 = makeDate(2021, 1, 1);
// const day2 = makeDate(2021, 1); // error，如果没有函数重载，这里会报错
const day3 = makeDate(1234325235);
