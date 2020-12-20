import * as fs from 'fs';
import { type } from 'os';
import { parse } from 'path';
import { promisify } from "util";

const MAGICNUMBER:number = 2020;


// async function getNbrArrayFromFile(input:string):Promise<any> {
const getNbrArrayFromFile = async(input:string):Promise<any> => {
    let content  = promisify(fs.readFile)(input, {encoding: 'utf-8'});
    var numbers:number[] = new Array;
    content.then(filestuff => {
        let strings:string[] = filestuff.split('\n') as string[];
        let numbers = strings.map(Number);

        let found:boolean = false;
        let val1:number;
        let val2:number;
        let val3:number;
        for(var i:number = 0; i < numbers.length && !found; i++){
            for(var j:number = i; j < numbers.length && !found; j++) {
                for(var k:number = j; k < numbers.length && !found; k++) {
                    let sum:number = numbers[i] + numbers[j] + numbers[k];
                    console.log(`${numbers[i]} + ${numbers[j]} + ${numbers[k]} = ${sum}`);
                    if(sum == MAGICNUMBER){
                        val1 = numbers[i];
                        val2 = numbers[j];
                        val3 = numbers[k];
                        found = true;
                    };
                };
            };
        };

        let mult:number = val1 * val2 * val3;
        console.log(mult);
    })
    .catch(err => {
        console.log(err);
    })
}

getNbrArrayFromFile('input/input');

// console.log(numbers);

// var numbers:number[] = [
//     1721,
//     979,
//     366,
//     299,
//     675,
//     1456,
// ]
