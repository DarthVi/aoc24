import { day1 } from "./day01/day1";
import { day2 } from "./day02/day2";

const day = "day02";
const inputFile = "input.txt";

(async () => {
  //const result = await day1_part1('src/day01/input.txt');
  const result = await day2(`src/${day}/${inputFile}`);
  console.log(result);
})();
