import { atom } from 'recoil';

export const getFocusedCategoryState = atom<string>({
  key: 'focusedCategoryState',
  default: 'All',
});
