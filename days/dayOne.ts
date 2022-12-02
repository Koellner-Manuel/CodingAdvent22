export{}

export function firstDay(filePath: string = '.\\days\\inputs\\one'): [number, number] {
    let data: Array<any> = readFile(filePath);
    let resultTuple: [number, number] = [partOne(data), partTwo(data)];
    return resultTuple;
}

function readFile(filePath: string): any[] {
    var readlines = require("n-readlines");
    var liner = new readlines(filePath);
    var data: Array<any> = [];
    var next;
    while (next = liner.next()) {
        if (next) {
            data.push(Number.parseInt(next));
        } else {
            data.push(next);
        }
    }
    return data;
}

function partOne(data: any[]): number {
    let result: number = 0;
    let tempCalories: number = 0;
    data.forEach(e => {
        if (!e) {
            if (tempCalories > result) {
                result = tempCalories;
            }
            tempCalories = 0;
        } else {
            tempCalories += e;
        }
    });

    return result;
}

function partTwo(data: any[]): number {
    let result: number = 0;
    let tempCals: number = 0;
    let calsList: Array<number> = [];
    data.forEach(e => {
        if (!e) {
            calsList.push(tempCals);
            tempCals = 0;
        } else {
            tempCals += e;
        }
    });
    calsList.sort((a, b) => (a > b ? -1 : 1));
    for (let index = 0; index < 3; index++) {
        result += calsList[index];
    }
    return result;
}

/*
function main(data: number[]): number {
    throw new Error("Function not implemented.");
}
*/
