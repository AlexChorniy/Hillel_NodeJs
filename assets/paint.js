const { colors } = require('./colors');

exports.paintFiles = (value, color) => {
    console.log(`${colors[color]}%s${colors.reset}`, value);
};

