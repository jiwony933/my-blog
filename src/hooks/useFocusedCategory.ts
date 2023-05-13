import { useRouter } from 'next/router';

export const useGetCategory = () => {
  const router = useRouter();
  const focusedCategory = router.query.category as string;

  const isFocused = (category: string) => {
    return category === focusedCategory;
  };

  return { focusedCategory, isFocused };
};
