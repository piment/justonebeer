function randomColumn () {
    let column = [80, 240, 400, 240, 400, 80, 400, 240, 80, 80, 400, 240];
    return column[Math.floor(Math.random()*column.length)];
}

function randomTime (start, end) {
    return Math.floor(Math.random(start, end) *(start - end) + end);
}

function randomBeerRow () {
return [randomBeerOrNot(),randomBeerOrNot(),randomBeerOrNot()]
}

function randomBeerOrNot () {
    let arrayRow = [0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1];
    return arrayRow[Math.floor(Math.random()*arrayRow.length)];
}

export {randomColumn, randomTime};