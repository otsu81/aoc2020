import * as fs from 'fs';
import { promisify } from 'util';

function countYeses(answers) {
    let forms = answers.split('\n');
    let responses = new Set<string>();
    forms.forEach(form => {
        // let alphabetSet = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));
        for (let i = 0; i < form.length; i++) {
            responses.add(form[i]);

        }
    })
    return responses.size;
}

const run = async(input:string) => {
    let m = promisify(fs.readFile)(input, {encoding: 'utf-8'});
    m.then(file => {
        let groups = file.split('\n\n');

        let yesses = 0;
        groups.forEach(group => {
            yesses += countYeses(group);
        })
        console.log(yesses)
    });
};

run('input/input.txt');