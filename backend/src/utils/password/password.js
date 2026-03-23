const bcrypt = require("bcrypt");


const hashPass = async(password) => {
    const saltRound = 10;
    return await bcrypt.hash(password,saltRound);
}

const comparePass = async(password,hashedPassword) => {
    return await bcrypt.compare(password,hashedPassword);
}

module.exports = {hashPass,comparePass};