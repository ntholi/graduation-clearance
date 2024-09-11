import { auth } from '@/auth';
import { Button } from '@/components/ui/button';

export default function Home() {
  const session = auth();
  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Button> Click me</Button>
    </div>
  );
}
