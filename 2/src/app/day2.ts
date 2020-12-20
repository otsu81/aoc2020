import * as fs from 'fs';
import { promisify } from 'util';

const checkWeirdPasswordPolicy = function(line:string):number {
    let [range, condition, pw] = line.split(' ');
    condition = condition.replace(/.$/, '');
    let notCondition = new RegExp(`[^${condition}]`, 'g');
    pw = pw.replace(notCondition, '');
    let checkLength = new RegExp(`^.{${range.replace('-',',')}}$`, 'g');
    if (pw.match(checkLength)) {
        return 1;
    } else return 0;
}

const checkWeirderPasswordPolicy = function(line:string):number {
    let [range, condition, pw] = line.split(' ');
    condition = condition.replace(/.$/, '');
    let [first, second] = range.split('-').map(Number);
    if ((pw[first-1] == condition) !== (pw[second-1] == condition)) {
        return 1;
    } else return 0;
}

const run = async(input:string) => {
    let passwords = promisify(fs.readFile)(input, {encoding: 'utf-8'});
    let passes1:number = 0;
    let passes2:number = 0;
    passwords.then(filestuff => {
        let lines:string[] = filestuff.split('\n');
        lines.forEach(line => {
            passes1 += checkWeirdPasswordPolicy(line);
            passes2 += checkWeirderPasswordPolicy(line);
        });
        console.log('For', input,':\nPasses1: ', passes1, '\nPasses2: ', passes2);
    })
};

run('input/input.txt');