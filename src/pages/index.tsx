import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Main = () => {
  const router = useRouter();

  useEffect(() => {
    // 페이지 진입 시 리다이렉션을 수행합니다.
    router.push('/posts');
  }, []);

  return <div>{/* 페이지 내용 */}</div>;
};

export default Main;
