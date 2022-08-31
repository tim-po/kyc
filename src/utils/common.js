/* eslint-disable no-undef */
export const wei2eth = (val) => {
    if (val) {
        return Number((BigInt(val) * BigInt(1000)) / BigInt(1000000000000000000)) / 1000;
    }
    return BigInt(0);
};

export const setInputStatus = (isSubmitted, isValid, isBlocked) => {
  if (isSubmitted && isValid) {
    return isBlocked
  } else {
    return false
  }
}
