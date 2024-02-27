// function to generate random string of length n
export function generateRandomString(): string {
    const length: number = 10;
    const characters: string = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    for (let i: number = 0; i < length; i++) {
        let randomNum: number = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomNum);
    }
    return result;

}