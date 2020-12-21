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

// Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.
function findSeat(seatIds:Set<number>, smallestSeatId:number, biggestSeatId:number) {
    let possibleSeats = new Set<number>();
    for (let i = smallestSeatId + 1; i < biggestSeatId - 1; i++) possibleSeats.add(i);
    seatIds.forEach(seat => {
        possibleSeats.delete(seat);
    })

    // sanity check according to rule
    possibleSeats.forEach(seat => {
        if (seatIds.has(seat - 1) && seatIds.has(seat +1)) console.log('Possible seat: ', seat)
    })
}


const run = async(input:string) => {
    let m = promisify(fs.readFile)(input, {encoding: 'utf-8'});
    m.then(file => {
        let lines:string[] = file.split('\n');
        let biggestSeatId = Number.MIN_SAFE_INTEGER;
        let smallestSeatId = Number.MAX_SAFE_INTEGER;
        let seatIds = new Set<number>();
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
            if (seatId < smallestSeatId) smallestSeatId = seatId;
            // console.log(boardingPass, 'Row:', row[0], 'Column:', column[0], 'SeatID:', seatId)

            seatIds.add(seatId);
        })
        console.log('Biggest SeatID: ', biggestSeatId, 'Smallest SeatID:', smallestSeatId);
        findSeat(seatIds, smallestSeatId, biggestSeatId);
    });
}

run('input/boardingPasses.txt');