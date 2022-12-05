export{}

import {firstDay} from './days/dayOne';
import {secondDay} from './days/dayTwo';
import {thirdDay} from './days/dayThree';
import {fourthDay} from './days/dayFour';

let dayOne: [number, number] = firstDay();
let dayTwo: [number, number] = secondDay();
let dayThree: [number, number] = thirdDay();
let dayFour: [number, number] = fourthDay();

console.log(`=============== Advent of code 2k22 ===============
# DAY 1 - Calorie Counting
# ---------------------------------
# * ${dayOne[0]} -> pt.1
# * ${dayOne[1]} -> pt.2
####################################################
# DAY 2 - Rock Paper Scissors
# ---------------------------------
# * ${dayTwo[0]} -> pt.1
# * ${dayTwo[1]} -> pt.2
####################################################
# DAY 3 - Rucksack Reorganization
# ---------------------------------
# * ${dayThree[0]} -> pt.1
# * ${dayThree[1]} -> pt.2
####################################################
# Day 4 - Camp Cleanup
# ---------------------------------
# * ${dayFour[0]} -> pt.1
# * ${dayFour[1]} -> pt.2
####################################################`);