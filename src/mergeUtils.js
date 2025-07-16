import { getH, getL, getS } from "./colorUtils";

export function mergeSortL(array) {
      if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = mergeSortL(array.slice(0, mid));
  const right = mergeSortL(array.slice(mid));

  return mergeL(left, right);
}

export function mergeSortH(array) {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = mergeSortH(array.slice(0, mid));
  const right = mergeSortH(array.slice(mid));

  return mergeH(left, right);
}

export function mergeSortS(array) {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = mergeSortS(array.slice(0, mid));
  const right = mergeSortS(array.slice(mid));

  return mergeS(left, right);
}

export function mergeSortR(array) {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = mergeSortR(array.slice(0, mid));
  const right = mergeSortR(array.slice(mid));

  return mergeR(left, right);
}

export function mergeSortG(array) {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = mergeSortG(array.slice(0, mid));
  const right = mergeSortG(array.slice(mid));

  return mergeG(left, right);
}

export function mergeSortB(array) {
  if (array.length <= 1) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  const left = mergeSortB(array.slice(0, mid));
  const right = mergeSortB(array.slice(mid));

  return mergeB(left, right);
}

function mergeL(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    const ll = getL(left[i].r, left[i].g, left[i].b);
    const rl = getL(right[j].r, right[j].g, right[j].b);
    if (ll < rl) {
      result.push(left[i]);
      i++;
    } else if (ll > rl) {
      result.push(right[j]);
      j++;
    } else {
      // if equal, sort by H
      const lh = getH(left[i].r, left[i].g, left[i].b);
      const rh = getH(right[j].r, right[j].g, right[j].b);
      if (lh < rh) {
        result.push(left[i]);
        i++;
      } else if (lh > rh) {
        result.push(right[j]);
        j++;
      } else {
        // if equal, sort by S
        const ls = getS(left[i].r, left[i].g, left[i].b);
        const rs = getS(right[j].r, right[j].g, right[j].b);
        if (ls < rs) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeH(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    const lh = getH(left[i].r, left[i].g, left[i].b);
    const rh = getH(right[j].r, right[j].g, right[j].b);
    if (lh < rh) {
      result.push(left[i]);
      i++;
    } else if (lh > rh) {
      result.push(right[j]);
      j++;
    } else {
      // if equal, sort by S
      const ls = getS(left[i].r, left[i].g, left[i].b);
      const rs = getS(right[j].r, right[j].g, right[j].b);
      if (ls < rs) {
        result.push(left[i]);
        i++;
      } else if (ls > rs) {
        result.push(right[j]);
        j++;
      } else {
        // if equal, sort by L
        const ll = getL(left[i].r, left[i].g, left[i].b);
        const rl = getL(right[j].r, right[j].g, right[j].b);
        if (ll < rl) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeS(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    const ls = getS(left[i].r, left[i].g, left[i].b);
    const rs = getS(right[j].r, right[j].g, right[j].b);
    if (ls < rs) {
      result.push(left[i]);
      i++;
    } else if (ls > rs) {
      result.push(right[j]);
      j++;
    } else {
      // if equal, sort by L
      const ll = getL(left[i].r, left[i].g, left[i].b);
      const rl = getL(right[j].r, right[j].g, right[j].b);
      if (ll < rl) {
        result.push(left[i]);
        i++;
      } else if (ll > rl) {
        result.push(right[j]);
        j++;
      } else {
        // if equal, sort by S
        const ls = getS(left[i].r, left[i].g, left[i].b);
        const rs = getS(right[j].r, right[j].g, right[j].b);
        if (ls < rs) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeR(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i].r < right[j].r) {
      result.push(left[i]);
      i++;
    } else if (left[i].r > right[j].r) {
      result.push(right[j]);
      j++;
    } else {
      // if equal, sort by L
      const ll = getL(left[i].r, left[i].g, left[i].b);
      const rl = getL(right[j].r, right[j].g, right[j].b);
      if (ll < rl) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeG(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i].g < right[j].g) {
      result.push(left[i]);
      i++;
    } else if (left[i].g > right[j].g) {
      result.push(right[j]);
      j++;
    } else {
      // if equal, sort by L
      const ll = getL(left[i].r, left[i].g, left[i].b);
      const rl = getL(right[j].r, right[j].g, right[j].b);
      if (ll < rl) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeB(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i].b < right[j].b) {
      result.push(left[i]);
      i++;
    } else if (left[i].b > right[j].b) {
      result.push(right[j]);
      j++;
    } else {
      // if equal, sort by L
      const ll = getL(left[i].r, left[i].g, left[i].b);
      const rl = getL(right[j].r, right[j].g, right[j].b);
      if (ll < rl) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}