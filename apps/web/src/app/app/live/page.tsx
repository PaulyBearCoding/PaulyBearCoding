import { Button } from '@/components/ui/button';
import { Radio } from 'lucide-react';

export default function LivePage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Live</h1>
          <Button>
            <Radio className="mr-2 h-4 w-4" />
            Go Live
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Radio className="h-16 w-16 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No live streams</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Check back later or start your own stream
          </p>
        </div>
      </div>
    </div>
  );
}
