const password = document.querySelector(".ps input");
const copy = document.querySelector(".copy");
const length = document.querySelector(".length");
const upper = document.querySelector(".upper");
const lower = document.querySelector(".lower");
const number = document.querySelector(".number");
const symbol = document.querySelector(".symbol");
const generate = document.querySelector("button");


const getRandomUpper = () => {
    let randomChar = Math.floor(Math.random() * 26) + 65;
    return String.fromCharCode(randomChar);
}
const getRandomLower = () => {
    let randomChar = Math.floor(Math.random() * 26) + 97;
    return String.fromCharCode(randomChar);
}
const getRandomNumber = () => {
    return Math.floor((Math.random() * 10));
}
const getRandomSymbol = () => {
    const symbols = `!@#$%^&*()-_=+[]{},<>./?'";:`;
    return symbols[Math.floor((Math.random() * symbols.length))];
}


generate.addEventListener('click', function () {
    let lengthVal = parseInt(length.value);
    let hasUpper = upper.checked;
    let hasLower = lower.checked;
    let hasNumber = number.checked;
    let hasSymbol = symbol.checked;
    let passwordFinal = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, lengthVal);
    password.value = passwordFinal;
})

const randomfunction = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = "";
    let typesArr = [];
    if (upper) { typesArr.push('upper') };
    if (lower) { typesArr.push('lower') };
    if (number) { typesArr.push('number') };
    if (symbol) { typesArr.push('symbol') };
    if (typesArr.length === 0) {
        return "";
    }
    for (let i = 0; i < length; i++) {
        let randomType = typesArr[Math.floor(Math.random() * typesArr.length)];
        generatedPassword += randomfunction[randomType]()
    }
    return generatedPassword;
}