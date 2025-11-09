import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

export default function FeedPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Feed</h1>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="foryou" className="w-full">
          <div className="sticky top-0 border-b bg-background">
            <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0">
              <TabsTrigger
                value="foryou"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                For You
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Following
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="foryou" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                No videos to show yet. Start following creators!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="following" className="mt-0">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                Follow some creators to see their content here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
