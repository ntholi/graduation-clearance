import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import Container from '@/components/ui/container';
import { User, BookOpen, GraduationCap, FileText } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  const links = [
    {
      title: 'Register',
      description: 'Register for 2024 term',
      href: '/register',
      icon: BookOpen,
    },
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
      <div className='flex items-center mb-8 space-x-4'>
        <Avatar className='size-24'>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback>
            <User className='size-12' />
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className='text-3xl font-bold'>{user?.name || 'Student Name'}</h1>
          <p className='text-lg text-gray-600'>
            Student Number: {user?.id || '12345678'}
          </p>
          <p className='text-lg text-gray-600'>
            Course of Study: Computer Science
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {links.map((link) => (
          <Link key={link.title} href={link.href}>
            <Card className='hover:shadow-lg transition-shadow'>
              <CardHeader>
                <div className='flex items-center space-x-4'>
                  <link.icon className='size-8 text-primary' />
                  <div>
                    <CardTitle>{link.title}</CardTitle>
                    <CardDescription>{link.description}</CardDescription>
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
