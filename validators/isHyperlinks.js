const regex = /(https?:\/\/|ftps?:\/\/|www\.)((?![.,?!;:()]*(\s|$))[^\s]){2,}/gim;

export const isHyperlinks = (str) => regex.test(str);
