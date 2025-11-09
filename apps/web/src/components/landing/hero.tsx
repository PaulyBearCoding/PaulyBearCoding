'use client';

import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/hooks/use-auth-modal';
import Link from 'next/link';
import { Video, MessageCircle, Radio } from 'lucide-react';

export function LandingHero() {
  const { setOpen } = useAuthModal();

  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Chat, Create, Connect
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Privacy-respecting social platform with real-time messaging,
            short video feed, and live streaming. All in one place.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" onClick={() => setOpen(true)}>
              Get started
            </Button>
            <Link href="/app">
              <Button size="lg" variant="outline">
                Open app
              </Button>
            </Link>
          </div>

          <div className="mt-16 flex justify-center gap-8">
            <div className="flex flex-col items-center">
              <MessageCircle className="h-8 w-8 text-primary" />
              <span className="mt-2 text-sm font-medium">Chat</span>
            </div>
            <div className="flex flex-col items-center">
              <Video className="h-8 w-8 text-primary" />
              <span className="mt-2 text-sm font-medium">Feed</span>
            </div>
            <div className="flex flex-col items-center">
              <Radio className="h-8 w-8 text-primary" />
              <span className="mt-2 text-sm font-medium">Live</span>
            </div>
          </div>
        </div>

        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative rounded-xl bg-muted/50 p-2 ring-1 ring-inset ring-foreground/10 lg:rounded-2xl lg:p-4">
            <div className="aspect-video overflow-hidden rounded-lg bg-background shadow-2xl">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                App Screenshot Preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
