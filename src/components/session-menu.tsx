'use client';

import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar';
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import type { Session } from 'next-auth';
import { Button } from './ui/button';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';

export function SessionMenu({ session }: { session: Session | null }) {
  if (!session) {
    return <Button onClick={() => signIn('google')}>Login</Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9">
          <AvatarImage
            alt="User profile"
            src={session?.user.image ?? undefined}
          />
          <AvatarFallback>
            {session?.user.name ? session?.user.name[0]?.toUpperCase() : ''}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 bg-gray-50 text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:text-white dark:ring-gray-700">
        <DropdownMenuItem>
          {session.user.name}
          <div className="pr-36"></div>
        </DropdownMenuItem>
        {session.user.isAdmin && (
          <DropdownMenuItem>
            <Link href="/dashboard">Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Link href="/analytics">Analytics</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={() => signOut()}>Logout</button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <a
            href="https://github.com/alex289/what-do-we-eat"
            target="_blank"
            rel="noopener norefferer">
            Github
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
