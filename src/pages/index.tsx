import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Main = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/posts');
  }, []);

  return <div>{/* 페이지 내용 */}</div>;
};

export default Main;
