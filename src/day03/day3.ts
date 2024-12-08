export async function day3(path: string) {
  return { part1: await day3_part1(path), part2: await day3_part2(path) };
}

async function day3_part1(path: string) {
  const text = await readFile(path);
  const regexArr = text.matchAll(/(mul\(([0-9]{1,3}),([0-9]{1,3})\))/g);
  return regexArr
    .map((entry) => parseInt(entry[2]) * parseInt(entry[3]))
    .reduce((a, b) => a + b, 0);
}

async function day3_part2(path: string) {
  const dont = "don't()";
  const loop = "do()";
  const mainregex = /(do\(\))|(don't\(\))|(mul\(([0-9]{1,3}),([0-9]{1,3})\))/g;
  let result = 0;
  let enabledMul = true;
  const text = await readFile(path);
  const regexArr = text.matchAll(mainregex);
  // regexArr.forEach((entry) => console.log(entry[0]));
  regexArr.forEach((entry) => {
    if (entry[0].toString() === dont) enabledMul = false;
    else if (entry[0].toString() === loop) enabledMul = true;
    else {
      if (enabledMul) result = result + parseInt(entry[4]) * parseInt(entry[5]);
    }
  });

  return result;
}

async function readFile(path: string) {
  const file = Bun.file(path);
  const text = await file.text();
  return text.trim();
}
