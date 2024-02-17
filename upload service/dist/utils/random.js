"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = void 0;
// function to generate random string of length n
function generateRandomString() {
    const length = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        let randomNum = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomNum);
    }
    return result;
}
exports.generateRandomString = generateRandomString;
