import { auth } from '@/libs/auth';
import { redirect } from 'next/navigation';

export default async function Settings() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/');
  } else {
    redirect('/settings/overview');
  }
}
