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

export const comma = (price: string | number) => {
  price = price.toString();
  return price.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};
export const unComma = (price: string | number) => {
  price = price.toString();
  return price.replace(/[^\d]+/g, '');
};

export const formatInputPrice = (price: string | number) => {
  return comma(unComma(price));
};

export const dash = (date: string | number) => {
  date = date.toString();
  return date.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
};
export const undash = (date: string | number) => {
  date = date.toString();
  return date.replace(/[^\d]+/g, '');
};

export const formatInputDate = (date: string | number) => {
  return dash(undash(date));
};

export const isRequiredValueFilled = (object: any, key: string) => {
  if (typeof object[key] === 'string') return !isEmptyString(object[key]);
  if (typeof object[key] === 'number') return !isZero(object[key]);
};

export const getKeysOfEmptyRequiredValue = (
  keysOfRequiredValue: string[],
  object: object
) => {
  return keysOfRequiredValue.filter(
    (info) => !isRequiredValueFilled(object, info)
  );
};

export const getLeftItemsAfterDeleteById = (
  itemsArray: any[],
  clickedId: number
) => {
  return itemsArray.filter((item) => item.id !== clickedId);
};

export const convertBooleanToString = (val: boolean | null): string => {
  return val === true ? 'true' : val === false ? 'false' : 'null';
};

export const convertStringToBoolean = (val?: string): boolean => {
  return val === 'true' ? true : false;
};

export const convertStringToBooleanOrNull = (val?: string): boolean | null => {
  return val === 'true' ? true : val === 'false' ? false : null;
};

export const getObjectWhichHasSameBooleanValue = (
  objects: any[],
  val: boolean
) => {
  return objects.find((object) => object.value === String(val));
};

export const getObjectWhichHasSameBooleanOrNullValue = (
  objects: any[],
  val: boolean | null
) => {
  if (typeof val === 'boolean')
    return getObjectWhichHasSameBooleanValue(objects, val);
  return undefined;
};

export const isEmptyInput = (input: any) => {
  if (input === null) return true;
  if (input.trim() === '') return true;
  else return false;
};

export const isAllValueInObjectEmpty = (object: object) => {
  return Object.values(object).every((value) => value === ('' || null));
};

export const getObjectSpecificKeyRemoved = (
  object: { [key: string]: any },
  specificKey: string
) => {
  const obj = object;
  delete obj[specificKey];
  return obj;
};

export const getSearchTermArray = (searchTerm: string) => {
  const spaceRemoved = searchTerm.replaceAll(' ', '');
  const array = spaceRemoved.split(',');
  return array;
};
