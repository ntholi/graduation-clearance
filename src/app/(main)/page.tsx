import { auth } from '@/auth';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Container from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import { FileText, GraduationCap } from 'lucide-react';
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
    <Container className='mt-10'>
      <div className=''>
        {/* <p className='text-sm border p-2 bg-card-foreground/5 rounded-md w-fit mx-auto'>
          Please verify your information below
        </p> */}
        <div className='flex flex-col items-center gap-1 mt-10'>
          <h1 className='text-3xl sm:text-5xl'>
            {user?.name || 'Student Name'}
          </h1>
          <p className='text-muted-foreground'>901013847</p>
          <p className='text-muted-foreground text-center'>
            Bsc Hons in Business Information Technology
          </p>
        </div>
      </div>
      <Separator className='my-10' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>
        {links.map((link) => (
          <Link key={link.title} href={link.href}>
            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center space-x-4'>
                  <link.icon className='size-8 text-primary' />
                  <div className='flex flex-col gap-1'>
                    <CardTitle>{link.title}</CardTitle>
                    <CardDescription className='text-[0.8rem]'>
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
