import * as fs from 'fs';
import {promisify} from 'util';


// Rules:
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
//     If cm, the number must be at least 150 and at most 193.
//     If in, the number must be at least 59 and at most 76.
function _hgt(hgt:string):boolean {
    try {
        var unit = hgt.substring(hgt.length-2, hgt.length);
        var measurement = +hgt.substring(0, hgt.length-2);

    } catch (error) { return false };

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
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
const hclRegex = /#[0-9a-f]{6}/g;
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
const eyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']);
// pid (Passport ID) - a nine-digit number, including leading zeroes.
const pidRegex = /\b[0-9]{9}\b/g;
// cid (Country ID) - ignored, missing or not.

function _checkMap(input:Map<string, string>) {
    var flag = true;

    let byr:number = +input.get('byr');
    if (byr < 1920 || byr > 2002) {
        console.log('invalid byr:', byr)
        flag = false;
    };

    let iyr:number = +input.get('iyr');
    if (iyr < 2010 || iyr > 2020) {
        console.log('invalid iyr:', iyr);
        flag = false;
    };

    let eyr:number = +input.get('eyr');
    if (eyr < 2020 || eyr > 2030) {
        console.log('invalid eyr:', eyr);
        flag = false;
    };


    let hgt:string = input.get('hgt');
    if (!_hgt(hgt)) {
        console.log('invalid hgt:', hgt);
        flag = false;
    };

    let ecl:string = input.get('ecl');
    if (!eyeColors.has(ecl)) {
        console.log('invalid ecl:', ecl);
        flag = false;
    };

    let hcl:string = input.get('hcl');
    if (!hcl.match(hclRegex)) {
        console.log('invalid byr:', byr);
        flag = false;
    };

    let pid:string = input.get('pid');
    if (!pid.match(pidRegex)) {
        console.log('invalid pid:', pid);
        flag = false;
    };

    return flag;
}


const run = async(input:string) => {
    let m = promisify(fs.readFile)(input, {encoding: 'utf-8'});
    m.then(file => {
        let entries:string[] = file.split('\n\n');
        let validPassportsPart1 = 0;
        let validPassportsPart2 = 0;
        for (let i = 0; i < entries.length; i++) {
            let passport = entries[i].replace(/\n/g, ' ').split(' ');
            let p = new Map();
            passport.forEach(entry => {
                let e = entry.split(':');
                p.set(e[0], e[1]);

            });
            if (p.size == 8 || (p.size == 7 && !p.get('cid'))) {
                validPassportsPart1++;
                if (_checkMap(p)) {
                    console.log(_checkMap(p));
                    validPassportsPart2++;
                };
            }
            else {
                console.log('invalid:\n', p)
            };

            console.log('----------')
        }
        console.log('Valid passorts part 1:', validPassportsPart1)
        console.log('Valid passorts part 2:', validPassportsPart2);;
    });
}

run('input/input.txt');
