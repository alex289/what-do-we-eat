import { getServerAuthSession } from '@/lib/auth';
import ThemeSwitcher from './theme-switcher';
import Link from 'next/link';
import { SessionMenu } from './session-menu';

export default async function Navbar() {
  const session = await getServerAuthSession();
  return (
    <nav className="flex h-20 w-full items-center justify-between px-4 md:px-6">
      <Link href="/" className="text-lg font-semibold md:text-2xl">
        What-do-we-eat
      </Link>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <SessionMenu session={session} />
      </div>
    </nav>
  );
}
