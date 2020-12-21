function binaryStep(step, direction, tuple) {
    if (direction == ('B' || 'L')) {
        return [tuple[0] + step, tuple[1]];
    } else if (direction == ('F' || 'R')) {
        return [tuple[0], tuple[1] - step];
    }
};

const run = async() => {
    let boardingPass = 'FBFBBFFRLR';
    let tuple = [0, 128];
    let step = 128;
    for (let i = 0; i < 7; i++) {
        step = step/2;
        tuple = binaryStep(step, boardingPass[i], tuple);
        console.log(boardingPass[i], tuple);
    };

    tuple = [0, 8];
    step = 8;
    for (let i = 7; i < boardingPass.length; i++) {
        step = step/2;
        tuple = binaryStep(step, boardingPass[i], tuple);
        console.log(boardingPass[i], tuple);
    }
}

run();