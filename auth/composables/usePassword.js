const numbers = '0123456789';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbols = '!@#$%^&*';
const characters = numbers + lowerCase + upperCase + symbols;

export function generatePassword(len = 8) {
  let password = '';
  const array = new Uint8Array(1);

  password += numbers[crypto.getRandomValues(array)[0] % numbers.length];
  password += symbols[crypto.getRandomValues(array)[0] % symbols.length];
  for (let i = 0; i < len; i++) {
    const c = crypto.getRandomValues(array)[0];
    password += characters[c % characters.length];
  }
  return password;
}