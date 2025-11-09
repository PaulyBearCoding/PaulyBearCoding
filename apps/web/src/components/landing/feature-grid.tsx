import { MessageCircle, Users, Video, Radio, Shield, Zap } from 'lucide-react';

const features = [
  {
    name: 'Real-time Chat',
    description:
      'One-to-one messaging and group spaces with typing indicators, read receipts, and rich media support.',
    icon: MessageCircle,
  },
  {
    name: 'Friends System',
    description:
      'Connect with friends, see online presence, send requests, and build your network.',
    icon: Users,
  },
  {
    name: 'Short Video Feed',
    description:
      'Create and discover engaging short-form videos with likes, comments, and algorithmic recommendations.',
    icon: Video,
  },
  {
    name: 'Live Streaming',
    description:
      'Go live with real-time chat, viewer counts, and interactive features for your audience.',
    icon: Radio,
  },
  {
    name: 'Privacy First',
    description:
      'Your data is yours. Granular privacy controls and no tracking or third-party analytics.',
    icon: Shield,
  },
  {
    name: 'Lightning Fast',
    description:
      'Built for performance with instant messaging, smooth scrolling, and optimized video playback.',
    icon: Zap,
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to connect
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            A complete social platform designed for privacy, speed, and seamless communication.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-primary"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
