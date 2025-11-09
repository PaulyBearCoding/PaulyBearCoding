export default function HomePage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">Home</h1>
        <p className="text-sm text-muted-foreground">
          Your recent conversations and quick actions
        </p>
      </div>

      <div className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Recent Conversations</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No recent conversations yet
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Friend Requests</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No pending requests
            </p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="font-semibold">Feed Activity</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Check out the latest posts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
