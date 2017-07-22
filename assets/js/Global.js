
function cleanSpaces(s) {
    return s.replace(/\s+/g, ' ');
}

function isWholeNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && Math.round(n) === Number(n) && n >= 0;
}

function prettyPrintArray(valueArray) {
    var html = '<strong>',
        i = 0;

    if (valueArray instanceof Array) {
        for (i = 0; i < valueArray.length; i++) {
            if (i % 2 === 0) {
                html += '<span style="color: red;">';
            } else {
                html += '<span style="color: blue;">';
            }

            html += valueArray[i] + '</span>';
        }
    } else {
        alert('prettyPrintArray() - received non array!');
    }

    return '</strong>' + html;
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }

    return array;
}

function zeroPad(number, width) {
    number = number.toString();
    width = width || 2;

    return number.length >= width ? number : new Array(width - number.length + 1).join('0') + number;
}