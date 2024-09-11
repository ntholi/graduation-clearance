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
    <Container className='mt-10 max-w-4xl mx-auto'>
      <div className='bg-gradient-to-r from-blue-500/5 to-purple-600/5 text-white rounded-lg shadow-xl p-8 mb-10'>
        <div className='flex flex-col items-center gap-2.5'>
          <div className='bg-white p-4 rounded-full'>
            <User className='size-16 text-blue-500' />
          </div>
          <h1 className='text-4xl sm:text-5xl'>
            {user?.name || 'Student Name'}
          </h1>
          <p className='text-xl'>901013847</p>
          <p className='text-center'>
            BSc Hons in Business Information Technology
          </p>
        </div>
      </div>
      <h2 className='text-2xl font-semibold mb-6 text-center'>Quick Actions</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {links.map((link) => (
          <Link key={link.title} href={link.href}>
            <Card className='hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1'>
              <CardHeader>
                <div className='flex items-center space-x-4'>
                  <div className='bg-primary/10 p-3 rounded-full'>
                    <link.icon className='size-8 text-primary' />
                  </div>
                  <div className='flex flex-col'>
                    <CardTitle className='text-xl'>{link.title}</CardTitle>
                    <CardDescription className='text-sm mt-1'>
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
