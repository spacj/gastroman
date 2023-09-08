export function generateRandomId() {
  return Math.floor(Math.random() * 100000) + 1;
}

export function unixTime() {
  return Math.round(+new Date() / 1000);
}
