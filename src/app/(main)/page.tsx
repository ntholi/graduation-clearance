import { auth } from '@/auth';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Container from '@/components/ui/container';
import { FileText, GraduationCap, User } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  const links = [
    {
      title: 'Graduation',
      description: 'Clearance for Graduation',
      href: '/graduation',
      icon: GraduationCap,
    },
    {
      title: 'Transcripts',
      description: 'View Your Transcripts',
      href: '/transcripts',
      icon: FileText,
    },
  ];

  return (
    <Container className='mx-auto mt-10 max-w-4xl'>
      <div className='mb-10 rounded-lg bg-gradient-to-r from-blue-950/60 to-purple-950/30 p-8 text-white shadow dark:from-blue-500/5 dark:to-purple-600/5'>
        <div className='flex flex-col items-center gap-2 text-center'>
          <div className='rounded-full bg-white p-4'>
            <User className='size-16 text-foreground/60 dark:text-secondary' />
          </div>
          <h1 className='text-2xl sm:text-5xl'>{'Student Name'}</h1>
          <p className=''>901013847</p>
          <p className='text-sm'>BSc Hons in Business Information Technology</p>
        </div>
      </div>
      <h2 className='mb-6 text-center text-2xl font-semibold'>Actions</h2>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {links.map((link) => (
          <Link key={link.title} href={link.href}>
            <Card className='group hover:text-primary/80 hover:shadow'>
              <CardHeader>
                <div className='flex items-center space-x-4'>
                  <div className='rounded-full bg-primary/10 p-3 transition-all duration-300 group-hover:scale-110'>
                    <link.icon className='size-8 text-primary' />
                  </div>
                  <div className='flex flex-col'>
                    <CardTitle className='text-xl'>{link.title}</CardTitle>
                    <CardDescription className='mt-1 text-sm'>
                      {link.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
