'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/hooks/use-auth-modal';
import Link from 'next/link';

export function AuthModal() {
  const { isOpen, setOpen } = useAuthModal();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn('email', { email, redirect: false });
      setIsSuccess(true);
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/app' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to GJYL</DialogTitle>
          <DialogDescription>
            Sign in to start chatting, creating, and connecting
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="py-8 text-center">
            <h3 className="text-lg font-semibold">Check your email</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We sent you a magic link to sign in
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Continue with Email'}
              </Button>
            </form>

            {process.env.NEXT_PUBLIC_AUTH_PROVIDERS?.includes('google') && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleOAuthSignIn('google')}
                >
                  Google
                </Button>
              </>
            )}

            {process.env.NEXT_PUBLIC_AUTH_PROVIDERS?.includes('github') && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleOAuthSignIn('github')}
              >
                GitHub
              </Button>
            )}
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground">
          By continuing, you agree to our{' '}
          <Link href="/legal/terms" className="underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/legal/privacy" className="underline">
            Privacy Policy
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
