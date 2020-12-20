import * as fs from 'fs';
import {promisify} from 'util';

const countTrees = (lines:string[], rightStep:number, downStep:number) => {
    let horizontalPosition = 0;
    let lineSize = lines[0].length;
    let trees = 0;

    for (let i = downStep; i < lines.length; i += downStep) {
        horizontalPosition = (horizontalPosition + rightStep)%lineSize;
        let property = lines[i][horizontalPosition];
        // console.log(property);
        if (property == '#') trees++;
    }

    return trees;

}

const run = async(input:string) => {
    let m = promisify(fs.readFile)(input, {encoding: 'utf-8'});
    m.then(file => {
        let lines:string[] = file.split('\n');
        let results = [];

        results.push(countTrees(lines, 1, 1));
        results.push(countTrees(lines, 3, 1));
        results.push(countTrees(lines, 5, 1));
        results.push(countTrees(lines, 7, 1));
        results.push(countTrees(lines, 1, 2));


        console.log(results);
        let sum = 1;
        results.forEach(nbr => {
            sum *= nbr;
        })
        console.log(sum);
    })
};

run('input/1.txt');