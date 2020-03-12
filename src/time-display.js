export const pad = num => {
  let s = num.toString();
  if (s.length < 2)
    s = '0' + s;
  return s;
}

export const displayTime = ([h, m, s]) => {
  return (h ? pad(h) + ':' : '') + pad(m) + ':' + pad(s);
};

export const displayTimeFull = ([h, m, s]) => {
  return pad(h) + ':' + pad(m) + ':' + pad(s);
};