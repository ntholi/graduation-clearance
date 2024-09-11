import { auth } from '@/auth';
import { Button } from '@/components/ui/button';

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Button> Click me</Button>
    </div>
  );
}
