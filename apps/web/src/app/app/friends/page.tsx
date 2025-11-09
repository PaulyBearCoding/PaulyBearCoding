import { UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FriendsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">Friends</h1>

        <div className="mt-4 flex gap-2">
          <Input
            type="search"
            placeholder="Search friends or add new…"
            className="flex-1"
          />
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Friend
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <UserPlus className="h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No friends yet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Use the search bar above to find friends
              </p>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No pending friend requests
              </p>
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="mt-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No friend suggestions at this time
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
