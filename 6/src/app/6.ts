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

function countYesesPart2(answers:string): number {
    let forms = answers.split('\n');
    // check if there's only one form, if there is all answers are valid
    if (forms.length == 1) return countYesesPart1(answers);
    // keep track of positives
    let positives = new Set<string>();
    // keep track of negatives so we don't need to check unnecessary letters
    let negatives = new Set<string>();

    // for each form
    for (let i = 0; i < forms.length; i++) {
        // for each letter
        for (let j = 0; j < forms[i].length; j++) {
            // for each next form
                // if letter in form
                // check next form
                // if end add to positives
                // else add to negative, break

        }
    }
    return 0;
}

const run = async(input:string) => {
    let m = promisify(fs.readFile)(input, {encoding: 'utf-8'});
    m.then(file => {
        // split groups
        let groups = file.split('\n\n');

        // count one group's responses at a time
        let yesses = 0;
        groups.forEach(group => {
            // yesses += countYesesPart1(group);
            console.log(countYesesPart2(group));
        })
        // console.log(yesses)
    });
};

run('input/testInput2.txt');