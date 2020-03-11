function rectangleArea(firstSide, secondSide) {
    result = firstSide * secondSide;
    return result;
}

function triangleArea(base, height) {
    result = (base + height) / 2;
    return result;
}

module.exports = {
    rectangleArea,
    triangleArea
};
