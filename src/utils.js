const hash = (str) => {
  let hash = 0;
  let chr;
  if (str.length === 0) return hash;
  for (let i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash * 31) + chr;
    hash |= 0;
  }
  return hash;
};

const hashToCol = (hash) => {
  return Math.floor((hash/2147483647)*360);
}

const color = (val) => {
  return "hsl(" + val + ",50%,60%)";
};

const nameToCol = (name) => {
  return color(hashToCol(hash(name)));
}