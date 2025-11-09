'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, MessageCircle, Video, Radio, Settings, VideoIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';

const navItems = [
  { name: 'Home', href: '/app', icon: Home },
  { name: 'Spaces', href: '/app/spaces', icon: MessageCircle },
  { name: 'Friends', href: '/app/friends', icon: Users },
  { name: 'Feed', href: '/app/feed', icon: Video },
  { name: 'Live', href: '/app/live', icon: Radio },
  { name: 'Video Controls', href: '/app/calls', icon: VideoIcon },
];

export function LeftRail() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">GJYL</h1>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <Link href="/app/settings" className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent">
          <Settings className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">Settings</span>
        </Link>

        {session?.user && (
          <div className="mt-2 flex items-center gap-3 rounded-lg p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.user.image || undefined} />
              <AvatarFallback>
                {session.user.name?.[0] || session.user.email?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{session.user.name}</p>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
