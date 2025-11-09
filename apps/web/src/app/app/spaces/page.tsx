import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function SpacesPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Spaces</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Space
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-lg font-semibold">No spaces yet</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a space to start chatting with groups
          </p>
        </div>
      </div>
    </div>
  );
}
