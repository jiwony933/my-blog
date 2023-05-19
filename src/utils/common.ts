import { ParsedUrlQuery } from 'querystring';

export const isEmptyArray = (array: any[]) => {
  return array.length === 0;
};

export const isEmptyString = (string: string) => {
  return string.replaceAll(' ', '').length === 0;
};

export const isZero = (num: number) => {
  return num === 0;
};

export const isEmptyObject = (object: object) => {
  return Object.keys(object).length === 0;
};

export const hasCorrespondingWord = (str1: string, str2: string) => {
  const formatSearchableWord = (string: string) => {
    return string.replaceAll(' ', '').toLowerCase();
  };
  return formatSearchableWord(str1).includes(formatSearchableWord(str2));
};

export const copyText = (string: string) => {
  return window.navigator.clipboard.writeText(string);
};

export const isEmptyInput = (input: any) => {
  if (input === null) return true;
  if (input.trim() === '') return true;
  else return false;
};
