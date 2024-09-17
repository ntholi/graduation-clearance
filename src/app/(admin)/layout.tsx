import { ModeToggle } from '@/components/theme/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Home, Menu, ShoppingCart, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Logo from '../(main)/base/Logo';
import NavLink, { NavLinkProps } from './core/NavLink';

type Props = {
  children: React.ReactNode;
};

const links: NavLinkProps[] = [
  { href: '/admin', label: 'Dashboard', icon: <Home /> },
  {
    href: '/signup-requests',
    label: 'Sign Up Requests',
    icon: <UserPlus />,
  },
  {
    href: '/admin',
    label: 'Finance',
    icon: <ShoppingCart />,
  },
];

export default function AdminLayout({ children }: Props) {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link href='/' className='flex items-center gap-2 font-semibold'>
              <Logo className='h-11 w-auto' width={150} height={150} />
            </Link>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              {links.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>
          </div>
          <div className='mt-auto p-4'>
            <AccountSection />
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'
              >
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <nav className='grid gap-2 text-lg font-medium'>
                <Link
                  href='/admin'
                  className='flex items-center gap-2 text-lg font-semibold'
                >
                  <Logo className='h-20' />
                </Link>
                {links.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
              </nav>
              <div className='mt-auto'>
                <AccountSection />
              </div>
            </SheetContent>
          </Sheet>
        </header>
        {children}
      </div>
      <div className='fixed bottom-0 right-0 p-6 lg:p-8'>
        <ModeToggle />
      </div>
    </div>
  );
}

function AccountSection() {
  return (
    <Card x-chunk='dashboard-02-chunk-0'>
      <CardHeader className='p-4'>
        <CardTitle>Account</CardTitle>
        <CardDescription>Your Account Info</CardDescription>
      </CardHeader>
      <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
        <Button size='sm' className='w-full'>
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
