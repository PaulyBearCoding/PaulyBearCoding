import { Video } from 'lucide-react';

export default function CallsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">Video Controls</h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Video className="h-16 w-16 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No active calls</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Start a call from a conversation or space
          </p>
        </div>
      </div>
    </div>
  );
}
