import * as fs from 'fs';
import { promisify } from 'util';

// takes the forms from a single group
function countYesesPart1(answers:string): number {
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

// only characters in the first form can be valid; if not present in first form they can't be present in all
function countYesesPart2(answers:string): number {
    let forms = answers.split('\n');
    // check if there's only one form, if there is all answers are valid
    if (forms.length == 1) return countYesesPart1(answers);

    // make set of negatives and remove as they become positive
    let negatives = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));
    let alphabetSize = negatives.size;

    // for each letter in first form
    for (let i = 0; i < forms[0].length; i++) {
        let flag = true;
        let formIndex = 0;
        while (flag && formIndex < forms.length - 1) {
            formIndex++;
            flag = forms[formIndex].includes(forms[0][i]);
        }
        if (flag) negatives.delete(forms[0][i]);
    }

    return alphabetSize - negatives.size;
}

const run = async(input:string) => {
    let m = promisify(fs.readFile)(input, {encoding: 'utf-8'});
    m.then(file => {
        // split groups
        let groups = file.split('\n\n');

        let yessesPart1 = 0;
        let yessesPart2 = 0;
        groups.forEach(group => {
            yessesPart1 += countYesesPart1(group);
            yessesPart2 += countYesesPart2(group);
        })
        console.log('Part1:', yessesPart1);
        console.log('Part2:', yessesPart2);
    });
};

run('input/input.txt');