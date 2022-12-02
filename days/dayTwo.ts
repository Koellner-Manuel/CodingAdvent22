import { equal } from "assert";

export{}

export function secondDay(filePath: string = '.\\days\\inputs\\two'): [number, number] {
    let data: string[][] = readFile(filePath);
    let resultTuple: [number, number] = [partOne(data), partTwo(data)];
    return resultTuple;
}

function readFile(filePath: string): string[][] {
    var readlines = require("n-readlines");
    var liner = new readlines(filePath);
    var data: Array<Array<string>> = [];
    var next;
    try {
        while (next = liner.next()) {
            let str = String(next);
            let x: string = str.substring(0, 1);
            let y: string = str.substring(2, 3);
            data.push([x, y]);
        }
        return data;
    } catch (error) {
        console.error("Error in input file!");
    }
}

function partOne(data: string[][]): number {
    let tournamentScore: number = 0;
    data.forEach(e => {
        let opponent: Choice = getChoice(e[0]);
        let me: Choice = getChoice(e[1]);
        let currentRound: Round = new Round(opponent, me);
        tournamentScore += currentRound.calculateRoundScore();
    });
    return tournamentScore;
}

function partTwo(data: string[][]): number {
    let tournamentScore: number = 0;
    data.forEach(e => {
        let opponent: Choice = getChoice(e[0]);
        let stat: GameStat = getPredictedStat(e[1]);
        let me: Choice;
        switch (stat) {
            case GameStat.Loss:
                if (opponent === Choice.Rock) {
                    me = Choice.Scissors;
                } else if (opponent === Choice.Paper) {
                    me = Choice.Rock;
                } else {
                    me = Choice.Paper;
                }
                break;
            case GameStat.Draw:
                me = opponent;
                break;
            case GameStat.Win:
                if (opponent === Choice.Rock) {
                    me = Choice.Paper;
                } else if (opponent === Choice.Paper) {
                    me = Choice.Scissors;
                } else {
                    me = Choice.Rock;
                }
                break;
        }
        tournamentScore += (stat.valueOf() + me.valueOf());
    });
    return tournamentScore;
}

class Round {
    opponentChoice: Choice;
    myChoice: Choice;
    stat: GameStat;

    constructor(x: Choice, y: Choice) {
        this.opponentChoice = x;
        this.myChoice = y;
    }

    calculateRoundScore(): number {
        let score: number = this.myChoice.valueOf();
        if (this.myChoice === Choice.Rock && this.opponentChoice == Choice.Scissors) {
            score += GameStat.Win.valueOf();
        } else if (this.myChoice == Choice.Scissors && this.opponentChoice == Choice.Paper) {
            score += GameStat.Win.valueOf();
        } else if (this.myChoice == Choice.Paper && this.opponentChoice == Choice.Rock) {
            score += GameStat.Win.valueOf();
        } else if (this.myChoice === this.opponentChoice) {
            score += GameStat.Draw.valueOf();
        } else {
            score += GameStat.Loss.valueOf();
        }
        return score;
    }
}

enum GameStat {
    Loss = 0,
    Draw = 3,
    Win = 6
}

enum Choice {
    Rock = 1,
    Paper = 2,
    Scissors = 3
}

/**
 * This functions decodes the input letter and returns the 
 * correct Choice based on the following key:
 * 
 * A,X -> Rock
 * B,Y -> Paper
 * C,Z -> Scissors
 * 
 * @param input the encoded input letter of the input file
 * @returns a member of the Choice enum 
 * @throws an error exception if the param doesn't match a key
 */
function getChoice(input: string): Choice | never {
    if (input == "A" || input == "X") {
        return Choice.Rock;
    } else if (input == "B" || input == "Y") {
        return Choice.Paper;
    } else if (input == "C" || input == "Z") {
        return Choice.Scissors;
    } else {
        throw new Error("Wrong input in input file!");
    }
}

function getPredictedStat(input: string): GameStat | never {
    switch (input) {
        case "X":
            return GameStat.Loss;
        case "Y":
            return GameStat.Draw;
        case "Z":
            return GameStat.Win;
        default:
            throw new Error("Wrong input in input file!");
    }
}