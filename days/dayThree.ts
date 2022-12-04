export{}

export function thirdDay(filePath: string = '.\\days\\inputs\\three'): [number, number] {
    let data: Rucksack[] = readFile(filePath);
    let resultTuple: [number, number] = [partOne(data), partTwo(data)];
    return resultTuple;
}

function readFile(filePath: string): Rucksack[] {
    var readlines = require("n-readlines");
    var liner = new readlines(filePath);
    var data: Array<Rucksack> = [];
    var next;
    while (next = liner.next()) {
        let input = String(next).replace('\r', '');
        data.push(new Rucksack(input));
    }
    return data;
}

function partOne(data: Rucksack[]): number {
    let sum: number = 0;
    data.forEach(e => {
        sum += e.getPriority(e.duplicatedItem);
    });
    return sum;
}


function partTwo(data: Rucksack[]): number {
    let sum: number = 0;
    for (let i = 0; i < data.length;) {
        let rucksacks: Rucksack[] = [];
        for (let j = 0; j < 3; j++) {
            rucksacks.push(data[i+j]);         
        }
        sum += data[i].getGroupPriority(rucksacks);
        i += 3
    }
    return sum;
}

class Rucksack {
    firstCompartment: string;
    secondCompartment: string;
    compartmentLength: number;
    duplicatedItem: string;
    priority: number;

    constructor(input: string) {
        let x = input.length;
        this.firstCompartment = input.substring(0, (x / 2));
        this.secondCompartment = input.substring((x / 2), x);
        this.compartmentLength = x;
        this.duplicatedItem = this.identifyDuplicate();
    }

    /**
     * Identifies the duplicate char in the first and second compartment
     * 
     * @returns a string containing the duplicate
     */
    private identifyDuplicate(): string {
        for (const x of this.firstCompartment.split('')) {
            for (const y of this.secondCompartment.split('')) {
                if (x === y) {
                    return x;
                }
            }
        }
        throw new Error(`No duplicate found in: ${this.firstCompartment} and ${this.secondCompartment}`);
    }

    /**
     * Calculates the priority of the given item
     * 
     * @param item a string containing a char from a-zA-Z
     * @returns a number with the calculated priority
     */
    getPriority(item: string): number {
        let abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (item.toLowerCase() === item) {
            return abc.indexOf(item.toUpperCase()) + 1;
        } else {
            return abc.indexOf(item) + 27;
        }
    }

    /**
     * Calculates the priority of the group based on their badge
     * 
     * @param rucksacks an array of the group members' rucksacks
     * @returns a number with the calculated priority
     */
    getGroupPriority(rucksacks: Rucksack[]): number {
        let badge: string = this.getGroupBadge(rucksacks);
        return this.getPriority(badge)
    }

    /**
     * Identifies the groups badge - a duplicate of each group's rucksacks
     * @param rucksacks an array of the group members' rucksacks
     * @returns a string containing the duplicate
     */
    private getGroupBadge(rucksacks: Rucksack[]): string {
        let concated: string[] = [];
        rucksacks.forEach(e => {
            concated.push(e.firstCompartment.concat(e.secondCompartment));
        });
        for (const x of concated[0].split('')) {
            for (const y of concated[1].split('')) {
                if (x === y) {
                    for (const z of concated[2].split('')) {
                        if (y === z) {
                            return z;
                        }
                    }
                }
            }
        }
    }
}