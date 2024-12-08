export async function day2(path: string) {
  return { part1: await day2_part1(path), part2: await day2_part2(path) };
}

async function day2_part1(path: string) {
  const arr = (await readFile(path)).map((entry) =>
    entry.map((num) => parseInt(num)),
  );
  return arr
    .map((entry) =>
      monotone(entry) && adjacentConstraint(entry, 1, 3)
        ? (1 as number)
        : (0 as number),
    )
    .reduce((a, b) => a + b);
}

async function day2_part2(path: string) {
  const arr = (await readFile(path)).map((entry) =>
    entry.map((num) => parseInt(num)),
  );
  return arr
    .map((entry) => {
      if (monotone(entry) && adjacentConstraint(entry, 1, 3))
        return 1 as number;
      else {
        const splicedArr: number[][] = [];
        for (let i = 0; i < entry.length; i++)
          splicedArr.push(entry.toSpliced(i, 1));

        if (
          splicedArr.some(
            (spliced) => monotone(spliced) && adjacentConstraint(spliced, 1, 3),
          )
        )
          return 1 as number;
        else return 0 as number;
      }
    })
    .reduce((a, b) => a + b);
}

async function readFile(path: string) {
  const file = Bun.file(path);
  const text = await file.text();
  return text
    .trim()
    .split("\n")
    .map((line) => line.trim().split(" "));
}

function monotone(arr: number[]): boolean {
  return (
    arr.every((entry, index) =>
      index !== arr.length - 1 ? entry < arr[index + 1] : true,
    ) ||
    arr.every((entry, index) =>
      index !== arr.length - 1 ? entry > arr[index + 1] : true,
    )
  );
}

function adjacentConstraint(arr: number[], min: number, max: number): boolean {
  const tol = 0;
  return arr.every((entry, index) =>
    index !== arr.length - 1
      ? Math.abs(entry - arr[index + 1]) >= min &&
        Math.abs(entry - arr[index + 1]) <= max
      : true,
  );
}
