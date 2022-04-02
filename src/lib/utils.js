function randomColumn () {
    let column = [80, 240, 400, 240, 400, 80, 400, 240, 80, 80, 400, 240];
    return column[Math.floor(Math.random()*column.length)];
}

function randomTime (start, end) {
    return Math.floor(Math.random(start, end) *(start - end) + end);
}

export {randomColumn, randomTime};


