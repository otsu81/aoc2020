import { NONAME } from 'dns';
import * as fs from 'fs';
import { promisify } from 'util';

function binaryStep(step:number, input:string, tuple:number[]) {
    switch (input) {
        case 'B': return [tuple[0] + step, tuple[1]];
        case 'R': return [tuple[0] + step, tuple[1]];
        case 'F': return [tuple[0], tuple[1] - step];
        case 'L': return [tuple[0], tuple[1] - step];
        default: return null;
    }
}


const run = async(input:string) => {
    let m = promisify(fs.readFile)(input, {encoding: 'utf-8'});
    m.then(file => {
        let lines:string[] = file.split('\n');
        let biggestSeatId = 0;
        lines.forEach(boardingPass => {
            let row = [0, 128];
            let step = 128;
            for (let i = 0; i < 7; i++) {
                step = +step/2;
                row = binaryStep(step, boardingPass[i], row);
            };

            let column = [0, 8];
            step = 8;
            for (let i = 7; i < boardingPass.length; i++) {
                step = step/2;
                column = binaryStep(step, boardingPass[i], column);
            }

            let seatId = row[0] * 8 + column[0];
            if (seatId > biggestSeatId) biggestSeatId = seatId;
            console.log(boardingPass, 'Row:', row[0], 'Column:', column[0], 'SeatID:', seatId)
        })
        console.log('Biggest SeatID: ', biggestSeatId)
    });
}

run('input/boardingPasses.txt');