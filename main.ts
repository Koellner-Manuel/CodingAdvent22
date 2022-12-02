export{}

import {firstDay} from './days/dayOne';
import {secondDay} from './days/dayTwo';

let dayOne: [number, number] = firstDay();
let dayTwo: [number, number] = secondDay();

console.log(`=============== Advent of code 2k22 ===============
# DAY 1 - Calorie Counting
# -------------------------
# * ${dayOne[0]} -> pt.1
# * ${dayOne[1]} -> pt.2
####################################################
# DAY 2 - Rock Paper Scissors
# -------------------------
# * ${dayTwo[0]} -> pt.1
# * ${dayTwo[1]} -> pt.2
####################################################`);