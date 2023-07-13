export const makeId = (length) => {
  let result = '';

  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i += 1) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }

  return result;
};

