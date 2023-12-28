export const saveScrollPosition = (pathname: string, scrollY: number) => {
  if (typeof window !== 'undefined') {
    window.sessionStorage.setItem(pathname, scrollY.toString());
  }
};
