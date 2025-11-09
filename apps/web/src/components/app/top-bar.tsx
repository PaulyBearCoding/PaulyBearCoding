'use client';

import { Bell, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

export function TopBar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-16 items-center justify-end gap-4 border-b px-6">
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>

      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
