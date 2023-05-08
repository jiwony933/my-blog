import Image from 'next/image';
import Link from 'next/link';

interface P {}

const Logo = ({}: P) => {
  return (
    <Link href='/posts'>
      <Image src='/logo.png' width={300} height={36} alt='지원 블로그' />
    </Link>
  );
};

export default Logo;
