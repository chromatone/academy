import { createDirectus, rest, staticToken, createItem, createUser } from '@directus/sdk'

import { getRandomValues } from 'crypto';

const token = useRuntimeConfig().apiToken

const client = createDirectus('https://db.chromatone.center/').with(rest()).with(staticToken(token))

export async function joinWaitlist(body) {
  try {
    const item = await client.request(createItem('waitlist', body))
    return item
  } catch (e) {
    console.log(e?.errors?.[0])
  }
}

export async function addStudent(data) {



  const cus = data?.data?.object

  const userData = {
    email: cus.email,
    password: randPassword(5, 5, 3),
    first_name: cus.name.split(' ')[0],
    last_name: cus.name.split(' ').slice(1).join(' ')
  }

  console.log(userData)
  let result
  try {
    result = await client.request(createUser(userData));
  } catch (e) {
    console.log(e)
  }


  console.log(result?.status)
}

function randPassword(letters, numbers, either) {
  var chars = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", // letters
    "0123456789", // numbers
    "!@#$%^&*()_+}{';'?>.<," // either
  ];

  function randInt(this_max) { // return int between 0 and this_max - 1
    let umax = Math.pow(2, 32);
    let max = umax - (umax % this_max);
    let r = new Uint32Array(1);
    do {
      getRandomValues(r);
    } while (r[0] > max);
    return r[0] % this_max;
  }

  function randCharFrom(chars) {
    return chars[randInt(chars.length)];
  }

  function shuffle(arr) { // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
    for (let i = 0, n = arr.length; i < n - 2; i++) {
      let j = randInt(n - i);
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  return shuffle([letters, numbers, either].map(function (len, i) {
    return Array(len).fill(chars[i]).map(x => randCharFrom(x)).join('');
  }).concat().join('').split('')).join('')
}