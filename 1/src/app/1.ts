import * as fs from 'fs';
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
        for(var i:number = 0; i < numbers.length && !found; i++){
            for(var j:number = i; j < numbers.length && !found; j++) {
                let sum:number = numbers[i] + numbers[j];
                console.log(`${numbers[i]} + ${numbers[j]} = ${sum}`);
                if(sum == MAGICNUMBER){
                    val1 = numbers[i];
                    val2 = numbers[j];
                    found = true;
                };
            };
        };

        let mult:number = val1 * val2;
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
