import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='h-screen w-screen flex justify-center items-center'>
      <Link href={'/admin'}>Why Not Right Now?</Link>
    </main>
  );
}
