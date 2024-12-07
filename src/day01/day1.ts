export async function day1(path:string) {
    return [await day1_part1(path), await day1_part2(path)];
}

async function day1_part1(path: string) {
    let arr1: number[] = [];
    let arr2: number[] = [];
    const splitted = await readFile(path);
    splitted.forEach(entry => arr1.push(parseInt(entry[0])));
    splitted.forEach(entry => arr2.push(parseInt(entry[1])));
    arr1 = arr1.sort((a, b) => a - b);
    arr2 = arr2.sort((a, b) => a - b);
    const finalArr = [arr1, arr2];
    return finalArr[0].map((entry, index) => Math.abs(entry - finalArr[1][index])).reduce((a, b) => a + b);
}

async function day1_part2(path: string) {
    let arr1: number[] = [];
    let arr2: number[] = [];
    const splitted = await readFile(path);
    splitted.forEach(entry => arr1.push(parseInt(entry[0])));
    splitted.forEach(entry => arr2.push(parseInt(entry[1])));
    const finalArr = [arr1, arr2];
    return finalArr[0].map((entry, index) => (entry * finalArr[1].filter(s => s === entry).length)).reduce((a, b) => a + b);
}

async function readFile(path: string) {
    const file = Bun.file(path);
    const text = await file.text();
    return text.trim().split('\n').map(line => line.trim().split('   '));
}