export function ProductGallery() {
  const screenshots = [
    {
      title: 'Modern Chat Interface',
      description: 'Clean and intuitive messaging with rich media support',
    },
    {
      title: 'Engaging Video Feed',
      description: 'Discover and share short-form content',
    },
    {
      title: 'Live Streaming',
      description: 'Connect with your audience in real-time',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See GJYL in action
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Explore the features that make GJYL the best way to connect
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {screenshots.map((screenshot, index) => (
            <div
              key={index}
              className="flex flex-col overflow-hidden rounded-lg bg-card"
            >
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Screenshot {index + 1}</span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold">{screenshot.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {screenshot.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
