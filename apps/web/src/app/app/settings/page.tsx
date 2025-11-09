import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="mt-6 space-y-4">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">Account Settings</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Manage your account information
              </p>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6 space-y-4">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">Privacy Settings</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Control who can see your content and contact you
              </p>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-4">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">Notification Preferences</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Manage how you receive notifications
              </p>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6 space-y-4">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold">Appearance</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Customize how GJYL looks
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
