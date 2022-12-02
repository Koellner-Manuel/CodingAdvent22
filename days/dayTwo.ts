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
        console.error(error.message);
    }
}

function partOne(data: string[][]): number {
    let tournamentScore: number = 0;
    data.forEach(e => {
        let opponent: Choice = getChoice(e[0]);
        let me: Choice = getChoice(e[1]);
        tournamentScore += calculateRoundScore(opponent, me);
    });
    return tournamentScore;
}

function partTwo(data: string[][]): number {
    let tournamentScore: number = 0;
    data.forEach(e => {
        let opponent: Choice = getChoice(e[0]);
        let stat: GameStat = getPredictedStat(e[1]);
        let me: Choice = getToPlayableChoice(opponent, stat);
        tournamentScore += (stat.valueOf() + me.valueOf());
    });
    return tournamentScore;
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
 * This function decodes the input letter and returns the 
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

/**
 * This function decodes the input letter and returns the 
 * correct GameStat based on the following key:
 * 
 * X -> Loss, Y -> Draw, Z -> Win
 * 
 * @param input the encoded input letter of the input file
 * @returns a member of the GameStat enum
 * @throws an error exception if the param doesn't match a key
 */
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

/**
 * This function calculates the score of a game-round
 * based on the given choice and the outcome
 * 
 * @param opponentChoice the opponents choice
 * @param myChoice my choice
 * @returns a number, the calculated score
 */
function calculateRoundScore(opponentChoice: Choice, myChoice: Choice): number {
    let score: number = myChoice.valueOf();
    if (myChoice === Choice.Rock && opponentChoice == Choice.Scissors) {
        score += GameStat.Win.valueOf();
    } else if (myChoice == Choice.Scissors && opponentChoice == Choice.Paper) {
        score += GameStat.Win.valueOf();
    } else if (myChoice == Choice.Paper && opponentChoice == Choice.Rock) {
        score += GameStat.Win.valueOf();
    } else if (myChoice === opponentChoice) {
        score += GameStat.Draw.valueOf();
    } else {
        score += GameStat.Loss.valueOf();
    }
    return score;
}

/**
 * This function returns the option which needs to be played
 * based on the opponents choice and the round outcome.
 * 
 * @param opponentChoice the opponents choice
 * @param outcome the round outcome
 * @returns a member of the Choice enum
 */
function getToPlayableChoice(opponentChoice: Choice, outcome: GameStat): Choice {
    switch (outcome) {
        case GameStat.Loss:
            if (opponentChoice === Choice.Rock) {
                return Choice.Scissors;
            } else if (opponentChoice === Choice.Paper) {
                return Choice.Rock;
            } else {
                return Choice.Paper;
            }
        case GameStat.Draw:
            return opponentChoice;
        case GameStat.Win:
            if (opponentChoice === Choice.Rock) {
                return Choice.Paper;
            } else if (opponentChoice === Choice.Paper) {
                return Choice.Scissors;
            } else {
                return Choice.Rock;
            }
    }
}