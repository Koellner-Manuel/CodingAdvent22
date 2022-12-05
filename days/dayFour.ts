export { }

export function fourthDay(filePath: string = '.\\days\\inputs\\four'): [number, number] {
    let data: Interval[][] = readFile(filePath);
    let resultTuple: [number, number] = [partOne(data), partTwo(data)];
    return resultTuple;
}

function readFile(filePath: string): Interval[][] {
    var readlines = require("n-readlines");
    var liner = new readlines(filePath);
    var data: Array<Array<Interval>> = [];
    var next;
    while (next = liner.next()) {
        let input = String(next).replace('\r', '');
        let temp: any[] = input.split(',');
        for (let i = 0; i < temp.length; i++) {
            let min: number = +temp[i].substring(0, temp[i].indexOf('-'));
            let max: number = +temp[i].substring(temp[i].indexOf('-') + 1, temp[i].length);
            temp[i] = new Interval(min, max);
        }
        data.push(temp);
    }
    return data;
}

function partOne(data: Interval[][]): number {
    let subsets: number = 0;
    data.forEach(e => {
        if ((e[0].from >= e[1].from && e[0].to <= e[1].to) || 
            (e[1].from >= e[0].from && e[1].to <= e[0].to)) {
                subsets++;
        }
    });
    return subsets;
}

function partTwo(data: Interval[][]): number {
    let overlaps: number = 0;
    data.forEach(e => {
        if (e[0].from <= e[1].to && e[1].from <= e[0].to) {
            overlaps++;
        }
    });
    return overlaps;
}

class Interval {
    from: number;
    to: number;

    constructor(from: number, to: number) {
        this.from = from;
        this.to = to;
    }
}