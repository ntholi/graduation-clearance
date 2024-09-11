import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  className?: string;
};

export default function Logo({ className }: Props) {
  const { theme } = useTheme();

  return (
    <Link href='/' className={className}>
      <Image
        width={100}
        height={100}
        className={className}
        src={theme === 'dark' ? '/logo-white.png' : '/logo-black.png'}
        alt='Logo'
      />
    </Link>
  );
}
