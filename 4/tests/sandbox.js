function byr(byr) {
    return null;
}

function hgt(hgt) {
    let unit = hgt.substring(hgt.length-2, hgt.length);
    let measurement = hgt.substring(0, hgt.length-2);

    switch(unit) {
        case 'in':
            if (measurement < 59 || measurement > 76) return false;
            break;
        case 'cm':
            if (measurement < 150 || measurement > 193) return false;
            break;
        default: return false;
    }
    return true;
};

function hcl(hcl) {
    regex = /#[0-9a-f]{6}/g;
    if (hcl.match(regex)) return true;
    else return false;
}

function ecl(ecl) {
    eyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
    return eyeColors.has(ecl);
}

function _pid(pid) {

}

// console.log(hgt('60in'));
// console.log(hgt('190cm'));
// console.log(hgt('190in'));
// console.log(hgt('190'));

// console.log(hcl('123abc'));
// console.log(hcl('#123abc'));
// console.log(hcl('#123abz'));

console.log(ecl('brn'));
console.log(ecl('wat'));